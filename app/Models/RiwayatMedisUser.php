<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatMedisUser extends Model
{
        protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'riwayat_medis_user';
     public function user() {
        return $this->belongsTo(User::class);
    }
}
