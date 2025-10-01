<?php

namespace App\Services;

use App\Models\SesiKonsultasi;

class OnlineConsultationService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getSesiKonsultasiById($id){
        $sesiKonsultasi = SesiKonsultasi::with('petugas', 'pasien', 'anak', 'kehamilan', 'jadwal')->findOrFail($id);
        return $sesiKonsultasi;
    }
}
