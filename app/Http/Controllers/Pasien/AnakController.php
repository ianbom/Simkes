<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateAnakRequest;
use App\Services\AnakService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        return response()->json([
            'message' => "Data anak {$anak->nama} berhasil ditambahkan.",
            'data' => $anak
        ], 201);
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


}
