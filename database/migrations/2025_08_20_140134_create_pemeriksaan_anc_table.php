<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('pemeriksaan_anc', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kehamilan_id')->constrained('kehamilan')->cascadeOnDelete();
            $table->foreignId('petugas_faskes_id')->constrained('users')->cascadeOnDelete();
            $table->enum('jenis_pemeriksaan', ['Rutin', 'Sakit']);
            $table->date('tanggal_checkup');

            // Data Ibu
            $table->decimal('berat_badan', 5, 2);
            $table->integer('tekanan_darah_sistolik');
            $table->integer('tekanan_darah_diastolik');
            $table->decimal('lila', 4, 1)->nullable();
            $table->decimal('tinggi_fundus', 4, 1)->nullable();
            $table->enum('status_bengkak_kaki', ['Tidak Ada', 'Ringan', 'Berat'])->nullable();
            $table->text('keluhan')->nullable();

            // Vital signs for "Sakit"
            $table->decimal('suhu_tubuh_celsius', 4, 1)->nullable();
            $table->integer('frekuensi_napas_per_menit')->nullable();
            $table->integer('frekuensi_jantung_per_menit')->nullable();

            // Catatan
            $table->text('catatan_petugas')->nullable();
            $table->text('deteksi_resiko')->nullable();
            $table->date('saran_kunjungan_berikutnya')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan_anc');
    }
};
