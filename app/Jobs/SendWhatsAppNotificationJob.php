<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\JadwalNotifikasi;
use App\Models\KeluargaAnggota;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendWhatsAppNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $jadwal;

    /**
     * Buat instance baru dari Job.
     */
    public function __construct(JadwalNotifikasi $jadwal)
    {
        $this->jadwal = $jadwal;
    }

    /**
     * Eksekusi Job.
     */
    public function handle(): void
    {
        try {
            $user = User::find($this->jadwal->user_id);

            if (!$user) {
                Log::warning("❌ User dengan ID {$this->jadwal->user_id} tidak ditemukan.");
                return;
            }

            // 🔹 Ambil semua anggota keluarga berdasarkan user
            $keluargaAnggota = KeluargaAnggota::with('user')
                ->whereHas('keluarga', function ($query) use ($user) {
                    $query->whereHas('anggota', function ($q) use ($user) {
                        $q->where('user_id', $user->id);
                    });
                })
                ->get();

            // Tambahkan user utama ke daftar penerima
            $penerima = collect([$user]);
            if ($keluargaAnggota->isNotEmpty()) {
                $keluargaUsers = $keluargaAnggota->pluck('user')->filter();
                $penerima = $penerima->merge($keluargaUsers)->unique('id');
            }

            // 🔹 Format pesan
            $message = "👩‍⚕️ *PENGINGAT PEMERIKSAAN *\n\n"
                . "Halo, *{$user->name}* dan Keluarga 👨‍👩‍👧‍👦\n\n"
                . "{$this->jadwal->judul}\n\n"
                . "{$this->jadwal->konten}\n\n"
                . "📅 Jadwal Pemeriksaan: " . date('d M Y', strtotime($this->jadwal->tanggal_dijadwalkan)) . "\n"
                . "🩺 Mohon hadir di fasilitas kesehatan sesuai jadwal.\n\n"
                . "_Pesan ini dikirim otomatis oleh SIMKESIA_";

            // 🔹 Kirim WA ke semua penerima
            foreach ($penerima as $receiver) {
                if (!$receiver->no_telp) {
                    Log::warning("⚠️ Nomor WA tidak ditemukan untuk anggota keluarga ID: {$receiver->id}");
                    continue;
                }

                $target = $receiver->no_telp;

                $response = Http::withHeaders([
                    'Authorization' => env('FONNTE_API_KEY'),
                ])->post('https://api.fonnte.com/send', [
                    'target' => $target,
                    'message' => $message,
                ]);

                $data = $response->json();

                if ($response->successful()) {
                    Log::info("✅ WA terkirim ke {$receiver->name} ({$target}) | Jadwal ID: {$this->jadwal->id}");
                } else {
                    Log::error("❌ Gagal kirim WA ke {$target}: " . json_encode($data));
                }
            }

        } catch (\Throwable $th) {
            Log::error("🚨 Error di SendWhatsAppNotificationJob: " . $th->getMessage());
        }
    }
}
