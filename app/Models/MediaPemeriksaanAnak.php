<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaPemeriksaanAnak extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'media_pemeriksaan_anak';

    protected $casts = [
        'file_url' => 'encrypted',
    ];

      public function pemeriksaanAnak() {
        return $this->belongsTo(PemeriksaanAnak::class);
    }

}
