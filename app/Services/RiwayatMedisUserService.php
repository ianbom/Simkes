<?php

namespace App\Services;

use App\Http\Requests\CreateRiwayatMedisUserRequest;
use App\Models\RiwayatMedisUser;
use Illuminate\Support\Facades\Auth;

class RiwayatMedisUserService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function create(CreateRiwayatMedisUserRequest $request)
    {
        $data = $request->validated();
        $userId = Auth::id();
        return RiwayatMedisUser::create([
            'user_id'          => $userId,
            'golongan_darah'   => $data['golongan_darah'] ?? null,
            'rhesus'           => $data['rhesus'] ?? null,
            'jumlah_keguguran' => $data['jumlah_keguguran'] ?? 0,
            'riwayat_alergi'   => $data['riwayat_alergi'] ?? null,
        ]);
    }
}
