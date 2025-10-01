<?php

namespace App\Services;

use App\Models\JadwalKetersediaan;
use App\Models\SesiKonsultasi;
use Illuminate\Support\Facades\Auth;

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

    public function listSchedulePetugas(){
        $userId = Auth::id();
        $schedule = JadwalKetersediaan::where('petugas_faskes_id', $userId)->get();
        return $schedule;
    }
}
