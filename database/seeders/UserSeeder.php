<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'ian',
            'password' => Hash::make('ianbom123'),
            'email' => 'ianbom@gmail.com'
        ]);

        User::create([
            'name' => 'petugas',
            'password' => Hash::make('ianbom123'),
            'email' => 'petugas@gmail.com'
        ]);
    }
}
