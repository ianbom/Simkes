<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notifikasi extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';

     public function user() {
        return $this->belongsTo(User::class);
    }
    public function jadwal() {
        return $this->hasMany(JadwalNotifikasi::class);
    }
}
