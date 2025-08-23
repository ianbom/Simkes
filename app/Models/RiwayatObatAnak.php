<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatObatAnak extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'riwayat_obat_anak';

    public function anak() {
        return $this->belongsTo(Anak::class);
    }
    public function obat() {
        return $this->belongsTo(ObatMaster::class);
    }
    public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanAnak::class);
    }
}
