<?php

namespace Database\Seeders;

use App\Models\Anak;
use App\Models\Kehamilan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'Warga',
            'Petugas Faskes',
            'Admin Faskes',
            'Superadmin',
        ];

        $roleCounters = [
            'Warga' => 1,
            'Petugas Faskes' => 1,
            'Admin Faskes' => 1,
            'Superadmin' => 1,
        ];

        $users = [];

        // === 1️⃣ Generate user acak ===
        for ($i = 1; $i <= 10; $i++) {
            $role = $roles[array_rand($roles)];
            $hasFaskes = in_array($role, ['Petugas Faskes', 'Admin Faskes']);
            $isWarga = $role === 'Warga';
            $gender = fake()->randomElement(['L', 'P']);

            $emailPrefix = strtolower(str_replace(' ', '', $role));
            $email = "{$emailPrefix}{$roleCounters[$role]}@gmail.com";

            $user = User::create([
                'faskes_id'         => $hasFaskes ? 1 : null,
                'provinsi_id'       => rand(1, 2),
                'kota_id'           => rand(1, 2),
                'kecamatan_id'      => rand(1, 2),
                'name'              => fake()->name($gender === 'L' ? 'male' : 'female'),
                'email'             => $email,
                'email_verified_at' => now(),
                'password'          => Hash::make('password'),
                'nik'               => fake()->unique()->numerify('32760##########'),
                'tanggal_lahir'     => fake()->date('Y-m-d', '2005-12-31'),
                'kelamin'           => $gender,
                'no_telp'           => fake()->unique()->numerify('08##########'),
                'role'              => $role,
                'profile_pic_url'   => null,
                'status_user'       => 'Aktif',
                'tanggal_meninggal' => null,
                'alamat'            => fake()->address(),
            ]);

            $users[] = $user;
            $roleCounters[$role]++;
        }

        // === 2️⃣ Tambahkan 1 Superadmin tetap ===
        $superadmin = User::create([
            'name'              => 'Superadmin Utama',
            'email'             => 'superadminutama@gmail.com',
            'password'          => Hash::make('superadmin123'),
            'role'              => 'Superadmin',
            'provinsi_id'       => 1,
            'kota_id'           => 1,
            'kecamatan_id'      => 1,
            'status_user'       => 'Aktif',
            'email_verified_at' => now(),
            'kelamin'           => 'L',
        ]);

        $users[] = $superadmin;

        // === 3️⃣ Generate anak & kehamilan ===
        foreach ($users as $user) {
            // 👶 Anak hanya untuk warga (baik pria maupun wanita)
            if ($user->role === 'Warga') {
                $jumlahAnak = rand(1, 3);

                for ($i = 1; $i <= $jumlahAnak; $i++) {
                    Anak::create([
                        'orang_tua_id'       => $user->id,
                        'kelahiran_id'       => null,
                        'nik'               =>  fake()->unique()->numerify('32760##########'),
                        'nama'               => fake()->firstName(),
                        'kelamin'            => fake()->randomElement(['L', 'P']),
                        'status_hidup'       => 'Hidup',
                        'tanggal_lahir'      => fake()->dateTimeBetween('-3 years', '-1 years')->format('Y-m-d'),
                        'tanggal_meninggal'  => null,
                        'berat_lahir_gram'   => rand(2500, 4000),
                        'panjang_lahir_cm'   => fake()->randomFloat(1, 45, 55),
                        'lingkar_kepala_cm'  => fake()->randomFloat(1, 30, 38),
                        'urutan_kelahiran'   => $i,
                        'kondisi'            => fake()->randomElement(['Sehat', 'Kurang Gizi', 'Cacat Lahir']),
                    ]);
                }

                // 🤰 Kehamilan hanya untuk warga perempuan
                if ($user->kelamin === 'P') {
                    $jumlahKehamilan = rand(1, 9);
                    for ($k = 1; $k <= $jumlahKehamilan; $k++) {
                        $hpht = Carbon::now()->subMonths(rand(1, 9));
                        $hpl = (clone $hpht)->addMonths(9);

                        Kehamilan::create([
                            'user_id'           => $user->id,
                            'kehamilan_ke'      => $k,
                            'hpht'              => $hpht->format('Y-m-d'),
                            'hpl'               => $hpl->format('Y-m-d'),
                            'tinggi_badan_awal' => fake()->randomFloat(1, 145, 175),
                            'jumlah_janin'      => fake()->randomElement([1, 2]), // mayoritas tunggal
                            'status'            => fake()->randomElement(['Aktif', 'Selesai', 'Keguguran']),
                        ]);
                    }
                }
            }
        }

        $this->command->info('✅ UserSeeder berhasil: user, anak, dan kehamilan dibuat.');
    }
}
