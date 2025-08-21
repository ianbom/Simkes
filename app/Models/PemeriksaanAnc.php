<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PemeriksaanAnc extends Model
{
        protected $guarded = ['id'];
    protected $primaryKey = 'id';

    public function kehamilan() {
        return $this->belongsTo(Kehamilan::class);
    }
    public function petugas() {
        return $this->belongsTo(User::class, 'petugas_faskes_id');
    }
    public function dataJanin() {
        return $this->hasMany(DataJanin::class);
    }
    public function media() {
        return $this->hasMany(MediaPemeriksaan::class);
    }
    public function hasilLab() {
        return $this->hasMany(HasilLab::class);
    }
    public function imunisasi() {
        return $this->hasMany(RiwayatImunisasi::class);
    }
    public function resep() {
        return $this->hasMany(ResepObatCheckup::class);
    }
}
