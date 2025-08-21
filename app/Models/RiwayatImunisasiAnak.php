<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatImunisasiAnak extends Model
{
        protected $guarded = ['id'];
    protected $primaryKey = 'id';

     public function anak() {
        return $this->belongsTo(Anak::class);
    }
    public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanAnak::class);
    }
}
