<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateRiwayatMedisUserRequest;
use App\Services\RiwayatMedisUserService;
use Illuminate\Http\Request;

class RiwayatMedisUserController extends Controller
{
    protected RiwayatMedisUserService $service;

    public function __construct(RiwayatMedisUserService $service)
    {
        $this->service = $service;
    }

    public function create()
    {
        return inertia('Pasien/RiwayatMedis/CreateRiwayatMedisPageRoute');
    }

    public function store(CreateRiwayatMedisUserRequest $request)
    {
        try {
           $riwayat = $this->service->create($request);
           return response()->json([
            'message' => "Riwayat medis user ID {$riwayat->user_id} berhasil dibuat.",
            'data' => $riwayat
           ], 201);
        //    return redirect()
        //     ->route('riwayat_medis_user.index')
        //     ->with('success', "Riwayat medis user ID {$riwayat->user_id} berhasil dibuat.");
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat membuat riwayat medis user.',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
