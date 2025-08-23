<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatKehamilan extends Model
{

        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'riwayat_kehamilan';
     public function user() {
        return $this->belongsTo(User::class);
    }
}
