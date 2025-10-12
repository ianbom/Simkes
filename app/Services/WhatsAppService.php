<?php

namespace App\Services;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function sendWA($target, $message){
        try {
            $response = Http::withHeaders([
                'Authorization' => env('FONNTE_API_KEY'),
            ])->post('https://api.fonnte.com/send', [
                'target' => $target,
                'message' => $message,
            ]);

            $result = json_decode($response, true);
            return response()->json($result);
        } catch (\Throwable $th) {
            Log::error('WhatsApp notification error: ' . $th->getMessage());
           return response()->json(['error' => $th->getMessage()]);
        }
    }
}
