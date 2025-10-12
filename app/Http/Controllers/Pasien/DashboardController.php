<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\ChatLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function chatbot()
    {

        $chatLogs = ChatLog::where('user_id', Auth::id())
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('Pasien/ChatBot/ChatBotPageRoute', [
            'chatLogs' => $chatLogs
        ]);
    }
}
