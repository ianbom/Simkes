<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResepObatCheckup extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'resep_obat_checkup';
      public function pemeriksaan() {
        return $this->belongsTo(PemeriksaanANC::class);
    }
    public function obat() {
        return $this->belongsTo(ObatMaster::class);
    }
}
