<?php

namespace App\Services;

use App\Models\User;

class PetugasService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getPetugasByFaskedId($faskesId)
    {
        $petugas = User::where('faskes_id', $faskesId)
        ->whereIn('role', ['Admin Faskes', 'Petugas Faskes'] )
        ->get();
        return $petugas;
    }
}
