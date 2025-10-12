<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HasilLab extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'hasil_lab';

    public function pemeriksaan()
    {
        return $this->belongsTo(PemeriksaanAnc::class, 'pemeriksaan_anc_id');
    }
}
