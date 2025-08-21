<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObatMaster extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
     public function resepCheckup() {
        return $this->hasMany(ResepObatCheckup::class);
    }
    public function riwayatObatAnak() {
        return $this->hasMany(RiwayatObatAnak::class);
    }
}
