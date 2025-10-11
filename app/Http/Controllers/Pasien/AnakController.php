<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAnakRequest;
use App\Models\Anak;
use App\Models\PemeriksaanAnak;
use App\Services\AnakService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class AnakController extends Controller
{
    protected AnakService $anakService;

    public function __construct(AnakService $anakService)
    {
        $this->anakService = $anakService;
    }

    public function store(CreateAnakRequest $request)
    {
        try {
            $anak = $this->anakService->createAnak($request);

            return redirect()->back();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat menambahkan data anak.',
                'error' => $th->getMessage()
            ], 500);
        }

    }
    public function viewPerkembanganAnak($id)
    {
        $child = Anak::findOrFail($id);
        $growth = PemeriksaanAnak::with('riwayatSakit', 'petugas.faskes')->where('anak_id', $child->id)->get();
        $allChilds = Anak::where('orang_tua_id', Auth::id())->get();


        return Inertia::render('Pasien/Grafik/ChildGraphPageRoute', [
            'child' => $child,
            'growth' => $growth,
            'allChilds' => $allChilds
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
            ->whereHas('anak', function ($query) use ($user) {
                $query->where('orang_tua_id', $user->id);
            })
            ->latest('tanggal_pemeriksaan')
            ->get(); // ✅ SEMUA DATA!

        return Inertia::render('Pasien/Riwayat/ChildCheckupHistoryPageRoute', [
            'checkupHistory' => $checkupHistory,
        ]);
    }
    // public function childCheckupHistory(Request $request)
    // {
    //     $user = Auth::user();

    //     $checkupHistory = PemeriksaanAnak::with([
    //         'anak.kelahiran',
    //         'anak.orangTua',
    //         'petugas.faskes',
    //         'skrining',
    //     ])
    //         ->whereHas('anak', function ($query) use ($user) {
    //             $query->where('orang_tua_id', $user->id);
    //         })
    //         ->latest('tanggal_pemeriksaan')
    //         ->paginate(20); // Load 20 per batch

    //     return Inertia::render('Pasien/Riwayat/ChildCheckupHistoryPageRoute', [
    //         'checkupHistory' => $checkupHistory,
    //     ]);
    // }
}
