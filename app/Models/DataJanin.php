<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DataJanin extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'data_janin';

      public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanANC::class, 'pemeriksaan_anc_id');
    }
    public function media() {
        return $this->hasMany(MediaPemeriksaan::class);
    }

    public function kehamilan() {
        return $this->belongsTo(Kehamilan::class);
    }
}
