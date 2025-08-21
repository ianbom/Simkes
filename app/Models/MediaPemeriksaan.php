<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaPemeriksaan extends Model
{
        protected $guarded = ['id'];
    protected $primaryKey = 'id';
      public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanANC::class);
    }
    public function janin() {
        return $this->belongsTo(DataJanin::class);
    }
}
