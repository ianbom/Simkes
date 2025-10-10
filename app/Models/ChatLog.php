<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatLog extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'chat_logs';

    public function chatSources(){
        return $this->hasMany(ChatSource::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
