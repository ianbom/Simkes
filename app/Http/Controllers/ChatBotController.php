<?php

namespace App\Http\Controllers;

use App\Models\ChatLog;
use App\Models\ChatSource;
use App\Services\ChatBotService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatBotController extends Controller
{

    protected $chatBotService;
    public function __construct(ChatBotService $chatBotService){
        $this->chatBotService = $chatBotService;
    }

    public function getWebSources(string $query){
    $response = Http::withHeaders([
        'X-API-KEY' => env('SERPER_API_KEY'),
    ])->post('https://google.serper.dev/search', [
        'q' => $query . ' site:alodokter.com OR site:kemenkes.go.id OR site:who.int',
    ]);

    return collect($response->json()['organic'] ?? [])
        ->take(3)
        ->map(fn($r) => [
            'title' => $r['title'],
            'link' => $r['link'],
            'snippet' => $r['snippet']
        ]);
}

public function buildContext(string $question)
{
    $dataPasien = $this->chatBotService->resumeData();
    $formattedData = json_encode($dataPasien, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $webResults = $this->getWebSources($question);

    $context  = "### KONTEKS PASIEN\n";
    $context .= "Gunakan data berikut untuk memahami kondisi pasien. Data sudah dalam format JSON yang terstruktur:\n\n";
    $context .= "```json\n{$formattedData}\n```\n\n";
    $context .= "### PERTANYAAN\n";
    $context .= "{$question}\n\n";
    $context .= "### HASIL PENCARIAN WEB (untuk referensi tambahan):\n";

    foreach ($webResults as $r) {
        $context .= "- **{$r['title']}**\n  URL: {$r['link']}\n  Ringkasan: {$r['snippet']}\n";
    }

    $context .= "\nInstruksi:\n";
    $context .= "1. Jawablah pertanyaan berdasarkan *data pasien* terlebih dahulu.\n";
    $context .= "2. Jika data tidak lengkap, gunakan referensi web di atas.\n";
    $context .= "3. Sertakan sumber web yang digunakan (URL) dalam jawaban.\n";

    return $context;
}
    public function chat(Request $request){
    try {
        $question = $request->input('question');

        // Validasi input
        if (!$question) {
            return response()->json([
                'status' => false,
                'message' => 'Pertanyaan tidak boleh kosong.',
            ], 400);
        }

        // Ambil user login
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized. Silakan login terlebih dahulu.'
            ], 401);
        }

        // Bangun konteks pasien + hasil pencarian web
        $context = $this->buildContext($question);

        $prompt = "
Kamu adalah chatbot kesehatan anak dan ibu bernama SIMKESIA AI.
Gunakan data pasien dan sumber web di bawah ini untuk menjawab dengan bahasa mudah dipahami.
Berikan jawaban informatif, edukatif, dan sertakan tautan sumber yang relevan di akhir jawaban.

$context
Jawaban:
";

        // --- Kirim ke Gemini API ---
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' . env('GEMINI_API_KEY');

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post($url, [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $prompt],
                    ],
                ],
            ],
        ]);

        if ($response->failed()) {
            Log::error('Gemini API Error: ' . $response->body());
            return response()->json([
                'status' => false,
                'message' => 'Gagal mendapatkan respons dari Gemini.',
                'error' => $response->json(),
            ], $response->status());
        }

        $data = $response->json();
        $answer = $data['candidates'][0]['content']['parts'][0]['text'] ?? 'Maaf, tidak ada jawaban dari Gemini.';

        // Ambil sumber web dari context (dari fungsi buildContext)
        $webResults = $this->getWebSources($question);
        $sourcesJson = json_encode($webResults, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        // --- Simpan ke Database ---
        $chatLog = ChatLog::create([
            'user_id' => $user->id,
            'question' => $question,
            'answer' => $answer,
            'model_name' => 'gemini-2.5-flash',
        ]);

        ChatSource::create([
            'chat_log_id' => $chatLog->id,
            'sources' => $sourcesJson,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Berhasil mendapatkan jawaban.',
            'answer' => $answer,
            'sources' => $webResults,
        ], 200);

    } catch (\Throwable $th) {
        Log::error('Chat Error: ' . $th->getMessage());
        return response()->json([
            'status' => false,
            'message' => 'Terjadi kesalahan pada server.',
            'error' => $th->getMessage(),
        ], 500);
    }
}



}
