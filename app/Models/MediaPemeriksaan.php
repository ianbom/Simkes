<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaPemeriksaan extends Model
{

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'media_pemeriksaan';

    protected $casts = [
        'file_url' => 'encrypted',
    ];


      public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanAnc::class, 'pemeriksaan_anc_id');
    }
    public function janin() {
        return $this->belongsTo(DataJanin::class);
    }
}
