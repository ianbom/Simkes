<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatMedisUser extends Model
{
        protected $guarded = ['id'];
    protected $primaryKey = 'id';
     public function user() {
        return $this->belongsTo(User::class);
    }
}
