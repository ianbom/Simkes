<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePemeriksaanAnakRequest;
use App\Services\PemeriksaanAnakService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class PemeriksaanAnakController extends Controller
{
    protected $pemeriksaanAnakService;

    public function __construct(PemeriksaanAnakService $pemeriksaanAnakService){
        $this->pemeriksaanAnakService = $pemeriksaanAnakService;
    }

    public function store(CreatePemeriksaanAnakRequest $request)
    {
        try {
            $result = $this->pemeriksaanAnakService->createPemeriksaanAnak(
                $request->validated()
            );

            return response()->json([
                'success' => true,
                'message' => 'Data pemeriksaan anak berhasil dibuat',
                'data' => $result['data']
            ], 201);

        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
