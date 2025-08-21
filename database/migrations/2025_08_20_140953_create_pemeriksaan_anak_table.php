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
        Schema::create('pemeriksaan_anak', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anak_id')->constrained('anak')->cascadeOnDelete();
            $table->foreignId('petugas_faskes_id')->constrained('users')->cascadeOnDelete();
            $table->enum('jenis_kunjungan', ['Rutin', 'Sakit']);
            $table->date('tanggal_pemeriksaan');
            $table->integer('usia_saat_periksa_bulan');

            $table->decimal('berat_badan_kg', 5,2)->nullable();
            $table->decimal('tinggi_badan_cm', 5,1)->nullable();
            $table->decimal('lingkar_kepala_cm', 5,1)->nullable();
            $table->enum('cara_ukur_tinggi', ['Berbaring', 'Berdiri'])->nullable();

            $table->decimal('suhu_tubuh_celsius', 4,1)->nullable();
            $table->integer('frekuensi_napas_per_menit')->nullable();
            $table->integer('frekuensi_jantung_per_menit')->nullable();
            $table->integer('saturasi_oksigen_persen')->nullable();

            $table->text('perkembangan_motorik')->nullable();
            $table->text('perkembangan_kognitif')->nullable();
            $table->text('perkembangan_emosional')->nullable();
            $table->text('catatan_pemeriksaan')->nullable();
            $table->timestamps();
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pemeriksaan_anak');
    }
};
