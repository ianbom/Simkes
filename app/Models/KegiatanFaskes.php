<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KegiatanFaskes extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'kegiatan_faskes';

     public function faskes() {
        return $this->belongsTo(Faskes::class);
    }
    public function pembuat() {
        return $this->belongsTo(User::class, 'user_id_pembuat');
    }
}
