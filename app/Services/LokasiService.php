<?php

namespace App\Services;

use App\Models\Kecamatan;
use App\Models\Kota;
use App\Models\Provinsi;

class LokasiService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getProvinsi(){
        $provinsi = Provinsi::orderBy('nama', 'asc')->get();
        return $provinsi;
    }

    public function getKota(){
        $kota = Kota::orderBy('nama', 'asc')->get();
        return $kota;
    }

    public function getKecamatan(){
        $kecamatan = Kecamatan::orderBy('nama', 'asc')->get();
        return $kecamatan;
    }
}
