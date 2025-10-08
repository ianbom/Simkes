<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Anak extends Model
{

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'anak';

    public function kelahiran() {
        return $this->belongsTo(Kelahiran::class);
    }
    public function pemeriksaan() {
        return $this->hasMany(PemeriksaanAnak::class);
    }
    public function imunisasi() {
        return $this->hasMany(RiwayatImunisasiAnak::class);
    }
    public function riwayatObat() {
        return $this->hasMany(RiwayatObatAnak::class);
    }
    public function riwayatSakit() {
        return $this->hasMany(RiwayatSakitAnak::class);
    }

    public function orangTua(){
        return $this->hasOne(User::class, 'id', 'orang_tua_id');
    }
}
