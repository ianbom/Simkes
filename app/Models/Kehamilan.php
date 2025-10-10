<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kehamilan extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'kehamilan';
     public function user() {
        return $this->belongsTo(User::class);
    }
    public function pemeriksaanAnc() {
        return $this->hasMany(PemeriksaanANC::class);
    }

    public function riwayatSakit() {
        return $this->hasMany(RiwayatSakitKehamilan::class);
    }
     public function riwayatSakitKehamilan() {
        return $this->hasMany(RiwayatSakitKehamilan::class);
    }
    public function imunisasi() {
        return $this->hasMany(RiwayatImunisasi::class);
    }
    public function kelahiran() {
        return $this->hasOne(Kelahiran::class);
    }
    public function janin() {
        return $this->hasMany(DataJanin::class);
    }
     public function dataJanin() {
        return $this->hasMany(DataJanin::class);
    }
}
