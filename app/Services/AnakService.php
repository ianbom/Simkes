<?php

namespace App\Services;

use App\Http\Requests\CreateAnakRequest;
use App\Models\Anak;
use Illuminate\Support\Facades\Auth;

class AnakService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {

    }

    public function createAnak(CreateAnakRequest $request): Anak
    {
        $data = $request->validated();

        return Anak::create([
            'kelahiran_id'      => $data['kelahiran_id'] ?? null,
            'orang_tua_id'     => $data['orang_tua_id'],
            'nama'              => $data['nama'] ?? null,
            'nik'              => $data['nik'] ?? null,
            'kelamin'           => $data['kelamin'],
            'status_hidup'      => $data['status_hidup'],
            'tanggal_lahir'     => $data['tanggal_lahir'] ?? null,
            'tanggal_meninggal' => $data['tanggal_meninggal'] ?? null,
            'berat_lahir_gram'  => $data['berat_lahir_gram'] ?? null,
            'panjang_lahir_cm'  => $data['panjang_lahir_cm'] ?? null,
            'lingkar_kepala_cm' => $data['lingkar_kepala_cm'] ?? null,
            'urutan_kelahiran'  => $data['urutan_kelahiran'] ?? null,
            'kondisi'           => $data['kondisi'] ?? null,
        ]);
    }


}
