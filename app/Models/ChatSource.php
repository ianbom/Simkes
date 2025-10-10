<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatSource extends Model
{
    protected $guarded = ['id'];
    protected $primaryKey = 'id';
    protected $table = 'chat_sources';

    public function chatLog(){
        return $this->belongsTo(ChatLog::class);
    }
}
