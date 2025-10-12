<?php

namespace App\Services;

use App\Models\Kehamilan;
use App\Models\PemeriksaanAnak;
use App\Models\PemeriksaanAnc;
use App\Models\SesiKonsultasi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getLatestPregnantPatient()
    {
        $userId = Auth::id();
        $latestPregnantPatients = PemeriksaanAnc::where('petugas_faskes_id', $userId)->with('kehamilan.user')->limit(4)->get();
        return $latestPregnantPatients;
    }

    public function getLatestChildPatient()
    {
        $userId = Auth::id();
        $latestChildPatients = PemeriksaanAnak::where('petugas_faskes_id', $userId)->limit(4)->get();
        return $latestChildPatients;
    }

    public function getConsulQueue()
    {
        $userId = Auth::id();
        $consulQueue = SesiKonsultasi::with('anak', 'kehamilan', 'pasien', 'petugas', 'jadwal')->where('petugas_faskes_id', $userId)->get();
        return $consulQueue;
    }

    public function getPatientByNik($nik)
    {
        $patient = User::where('nik', $nik)->first();
        return $patient;
    }

    public function createKehamilan(array $data)
    {
        return DB::transaction(function () use ($data) {

            return Kehamilan::create([
                'user_id' => $data['user_id'],
                'kehamilan_ke' => $data['kehamilan_ke'],
                'hpht' => $data['hpht'],
                'hpl' => $data['hpl'],
                'tinggi_badan_awal' => $data['tinggi_badan_awal'],
                'jumlah_janin' => $data['jumlah_janin'],
                'status' => $data['status'] ?? 'Aktif',
            ]);
        });
    }

    

}
