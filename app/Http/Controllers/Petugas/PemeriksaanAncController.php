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

class PemeriksaanAncController extends Controller
{

    protected $pemeriksaanAncService;

    public function __construct(PemeriksaanAncService $pemeriksaanAncService){
        $this->pemeriksaanAncService = $pemeriksaanAncService;
    }

     public function store(CreatePemeriksaanAncRequest $request)
    {
        try {
            $result = $this->pemeriksaanAncService->createPemeriksaanAnc(
                $request->validated()
            );

           return response()->json($result);

        } catch (Throwable $e) {
           return response()->json(['err' => $e->getMessage()]);
        }
    }

    public function createPemeriksaanKehamilan($id){
        $pregnant = Kehamilan::with('user')->findOrFail($id);
        // return response()->json($pregnant);
        return Inertia::render('Petugas/Pemeriksaan/Kehamilan/PregnancyCheckupPageRoute', [
            'pregnant' => $pregnant,
        ]);
    }
}
