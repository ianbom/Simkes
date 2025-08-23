<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreatePemeriksaanAncRequest;
use App\Services\PemeriksaanAncService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

            return response()->json([
                'success' => true,
                'message' => 'Data pemeriksaan ANC berhasil dibuat',
                'data' => $result['data']
            ], 201);

        } catch (Throwable $e) {
            Log::error($e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
