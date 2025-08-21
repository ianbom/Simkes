<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalKetersediaan extends Model
{

    protected $guarded = ['id'];
    protected $primaryKey = 'id';
     public function petugas() {
        return $this->belongsTo(User::class, 'petugas_faskes_id');
    }
    public function sesi() {
        return $this->hasMany(SesiKonsultasi::class, 'jadwal_id');
    }
}
