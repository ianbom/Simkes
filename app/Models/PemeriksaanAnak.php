<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PemeriksaanAnak extends Model
{

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'pemeriksaan_anak';
    public function anak()
    {
        return $this->belongsTo(Anak::class);
    }
    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_faskes_id');
    }
    public function skrining()
    {
        return $this->hasOne(SkriningPerkembangan::class);
    }

    public function riwayatSakit(){
        return $this->hasMany(RiwayatSakitAnak::class);
    }
}
