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
use Illuminate\Support\Facades\Auth;
use App\Models\PemeriksaanAnak;

class PemeriksaanAnakController extends Controller
{
    protected $pemeriksaanAnakService;

    public function __construct(PemeriksaanAnakService $pemeriksaanAnakService)
    {
        $this->pemeriksaanAnakService = $pemeriksaanAnakService;
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

    public function createPemeriksaan($id)
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
