<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkriningPerkembangan extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanAnak::class);
    }
}
