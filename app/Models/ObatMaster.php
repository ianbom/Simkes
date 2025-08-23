<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObatMaster extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'obat_master';
     public function resepCheckup() {
        return $this->hasMany(ResepObatCheckup::class);
    }
    public function riwayatObatAnak() {
        return $this->hasMany(RiwayatObatAnak::class);
    }
}
