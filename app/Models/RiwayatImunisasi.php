<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatImunisasi extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';

    public function kehamilan() {
        return $this->belongsTo(Kehamilan::class);
    }
    public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanANC::class);
    }
}
