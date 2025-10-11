<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePemeriksaanAnakRequest;
use App\Models\Anak;
use App\Services\PemeriksaanAnakService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;
use App\Models\RiwayatSakitAnak;
use Illuminate\Support\Facades\Auth;
use App\Models\PemeriksaanAnak;

class PemeriksaanAnakController extends Controller
{
    protected $pemeriksaanAnakService;

    public function __construct(PemeriksaanAnakService $pemeriksaanAnakService)
    {
        $this->pemeriksaanAnakService = $pemeriksaanAnakService;
    }
    public function createPemeriksaan($id)
    {
        $child = Anak::with(['kelahiran', 'orangTua'])->findOrFail($id);
        $growth = PemeriksaanAnak::with('riwayatSakit', 'petugas.faskes')->where('anak_id', $child->id)->get();
        $checkupHistory = PemeriksaanAnak::where('anak_id', $id)
            ->with(['anak.kelahiran', 'anak.orangTua', 'petugas.faskes', 'skrining'])
            ->orderBy('tanggal_pemeriksaan', 'desc')
            ->get()
            ->toArray();

        $sickHistory = RiwayatSakitAnak::where('anak_id', $id)
            ->with(['anak.kelahiran', 'anak.orangTua', 'pemeriksaan.petugas.faskes'])
            ->orderBy('tanggal_sakit', 'desc')
            ->get()
            ->toArray();
        return Inertia::render('Petugas/Pemeriksaan/Anak/ChildCheckupPageRoute', [
            'child' => $child,
            'checkupHistory' => $checkupHistory,
            'sickHistory' => $sickHistory,
            'growth' => $growth
        ]);
    }
    public function store(CreatePemeriksaanAnakRequest $request)
    {
        try {
            $result = $this->pemeriksaanAnakService->createPemeriksaanAnak(
                $request->validated()
            );

            return redirect()->back()->with('success', 'Data berhasil disimpan');
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function index($id)
    {
        $child = Anak::with('orangTua')->findOrFail($id);

        return Inertia::render('Petugas/Pemeriksaan/Anak/ChildCheckupPageRoute', [
            'child' => $child
        ]);
    }
    public function childCheckupHistory()
    {
        $user = Auth::user();

        $checkupHistory = PemeriksaanAnak::with([
            'anak.kelahiran',
            'anak.orangTua',
            'petugas.faskes',
            'skrining',
        ])
            ->where('petugas_faskes_id', $user->id)
            ->latest('tanggal_pemeriksaan')
            ->get();

        return Inertia::render('Petugas/Riwayat/ChildCheckupHistoryPageRoute', [
            'checkupHistory' => $checkupHistory,
        ]);
    }
}
