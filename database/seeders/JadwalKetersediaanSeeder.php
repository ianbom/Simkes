<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JadwalKetersediaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        $petugasList = User::where('role', 'Petugas Faskes')->get();

        if ($petugasList->isEmpty()) {
            $this->command->warn('⚠️ Tidak ada user dengan role Petugas Faskes. Seeder dibatalkan.');
            return;
        }

        $jamKerjaList = [
            ['08:00', '10:00'],
            ['10:00', '12:00'],
            ['13:00', '15:00'],
            ['15:00', '17:00'],
        ];

        foreach ($petugasList as $petugas) {
            for ($i = 1; $i <= 7; $i++) { // 7 hari ke depan
                $tanggal = Carbon::today()->addDays($i);

                // Pilih jam kerja acak
                $jamKerja = $jamKerjaList[array_rand($jamKerjaList)];

                DB::table('jadwal_ketersediaan')->insert([
                    'petugas_faskes_id' => $petugas->id,
                    'tanggal' => $tanggal->toDateString(),
                    'jam_mulai' => $jamKerja[0],
                    'jam_selesai' => $jamKerja[1],
                    'status_ketersediaan' => 'Tersedia',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $this->command->info('✅ Jadwal ketersediaan berhasil dibuat untuk semua Petugas Faskes.');
    }
}
