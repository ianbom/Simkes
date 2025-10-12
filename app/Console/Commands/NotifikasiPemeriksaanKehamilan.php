<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\JadwalNotifikasi;
use App\Jobs\SendWhatsAppNotificationJob;
use Illuminate\Support\Facades\Log;

class NotifikasiPemeriksaanKehamilan extends Command
{

    protected $signature = 'app:notifikasi-pemeriksaan-kehamilan';

    protected $description = 'Mengirimkan notifikasi WhatsApp kepada pengguna ketika jadwal pemeriksaan kehamilan tiba';

    public function handle()
    {
        Log::info('Masuk');

        $today = now()->format('Y-m-d');
        $this->info("📅 Menjalankan notifikasi pemeriksaan kehamilan untuk tanggal {$today}");
        $jadwals = JadwalNotifikasi::whereDate('tanggal_dijadwalkan', $today)->get();

        if ($jadwals->isEmpty()) {
            $this->warn('⚠️ Tidak ada jadwal notifikasi hari ini.');
            Log::info('Tidak ada jadwal notifikasi kehamilan hari ini.');
            return;
        }

        $this->info("📨 Menemukan {$jadwals->count()} jadwal notifikasi.");

        foreach ($jadwals as $jadwal) {
            dispatch(new SendWhatsAppNotificationJob($jadwal))->delay(now()->addSeconds(3));
            $this->line("✅ Notifikasi dikirim ke user ID: {$jadwal->user_id}");
        }

        Log::info("✅ Berhasil dispatch {$jadwals->count()} job notifikasi ke queue.");
        $this->info('🎉 Semua notifikasi berhasil dikirim ke queue.');
    }
}
