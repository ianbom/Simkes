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


        // return redirect()
        //     ->route('anak.index')
        //     ->with('success', "Data anak {$anak->nama} berhasil ditambahkan.");
    }

    public function viewPerkembanganAnak($id){
        $child = Anak::findOrFail($id);
        $growth = PemeriksaanAnak::where('anak_id', $child->id)->get();

        // return response()->json($growth);

        return Inertia::render('Pasien/Grafik/ChildGraphPageRoute', [
            'child' => $child,
            'growth' => $growth
        ]);

    }


}
