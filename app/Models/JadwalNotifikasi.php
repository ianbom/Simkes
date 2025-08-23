<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalNotifikasi extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'jadwal_notifikasi';

        public function user() {
        return $this->belongsTo(User::class);
    }
    public function notifikasi() {
        return $this->belongsTo(Notifikasi::class);
    }
}
