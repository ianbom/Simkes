<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SesiKonsultasi extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'sesi_konsultasi';

        public function pasien() {
        return $this->belongsTo(User::class, 'pasien_user_id');
    }
    public function petugas() {
        return $this->belongsTo(User::class, 'petugas_faskes_id');
    }
    public function anak() {
        return $this->belongsTo(Anak::class);
    }
    public function kehamilan() {
        return $this->belongsTo(Kehamilan::class);
    }
    public function jadwal() {
        return $this->belongsTo(JadwalKetersediaan::class, 'jadwal_id', 'id');
    }
}
