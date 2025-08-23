<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatSakitKehamilan extends Model
{
        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'riwayat_sakit_kehamilan';
      public function kehamilan() {
        return $this->belongsTo(Kehamilan::class);
    }
    public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanANC::class, 'pemeriksaan_anc_id');
    }
}
