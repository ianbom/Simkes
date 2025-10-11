<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePemeriksaanAncRequest;
use App\Models\Kehamilan;
use App\Services\PemeriksaanAncService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;
use Illuminate\Support\Facades\Auth;
use App\Models\PemeriksaanAnc;
use App\Models\RiwayatSakitKehamilan;

class PemeriksaanAncController extends Controller
{

    protected $pemeriksaanAncService;

    public function __construct(PemeriksaanAncService $pemeriksaanAncService)
    {
        $this->pemeriksaanAncService = $pemeriksaanAncService;
    }

    public function store(CreatePemeriksaanAncRequest $request)
    {
        try {
            $result = $this->pemeriksaanAncService->createPemeriksaanAnc(
                $request->validated()
            );

            return redirect()->back();
        } catch (Throwable $e) {
            return response()->json(['err' => $e->getMessage()]);
        }
    }
    public function index($id)
    {
        $pregnant = Kehamilan::with(['user', 'janin'])->findOrFail($id);
        $checkupHistory = PemeriksaanAnc::where('kehamilan_id', $id)
            ->with([
                'kehamilan.user',
                'petugas.faskes',
                'dataJanin',
                'hasilLab',
                'imunisasi',
            ])
            ->orderBy('tanggal_checkup', 'desc')
            ->get()
            ->toArray();


        $growth = PemeriksaanAnc::with([
            'hasilLab',
            'petugas.faskes',
            'riwayatSakitKehamilan',
            'dataJanin'
        ])
            ->where('kehamilan_id', $pregnant->id)
            ->orderBy('tanggal_checkup', 'asc')
            ->get()
            ->toArray();

        $sickHistory = RiwayatSakitKehamilan::where('kehamilan_id', $id)
            ->with([
                'kehamilan.user',
                'pemeriksaan.petugas.faskes',
            ])
            ->orderBy('tanggal_diagnosis', 'desc')
            ->get()
            ->toArray();

        return Inertia::render('Petugas/Pemeriksaan/Kehamilan/PregnancyCheckupPageRoute', [
            'pregnant' => $pregnant,
            'checkupHistory' => $checkupHistory,
            'sickHistory' => $sickHistory,
            'growth' => $growth,
        ]);
    }
    public function createPemeriksaanKehamilan($id)
    {
        $pregnant = Kehamilan::with('user')->findOrFail($id);
        // return response()->json($pregnant);
        return Inertia::render('Petugas/Pemeriksaan/Kehamilan/PregnancyCheckupPageRoute', [
            'pregnant' => $pregnant,
        ]);
    }
    public function pregnancyCheckupHistory()
    {
        $user = Auth::user();
        $checkupHistory = PemeriksaanAnc::with([
            'kehamilan.user',
            'petugas.faskes',
            'dataJanin',
            'media',
            'hasilLab',
            'imunisasi',
            'resep',
        ])
            ->where('petugas_faskes_id', $user->id)
            ->latest('tanggal_checkup')
            ->get();

        return Inertia::render('Petugas/Riwayat/PregnancyCheckupHistoryPageRoute', [
            'checkupHistory' => $checkupHistory,
        ]);
    }
}
