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
        Schema::create('sesi_konsultasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasien_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('anak_id')->nullable()->constrained('anak')->cascadeOnDelete();
            $table->foreignId('kehamilan_id')->nullable()->constrained('kehamilan')->cascadeOnDelete();
            $table->foreignId('petugas_faskes_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('jadwal_id')->nullable()->constrained('jadwal_ketersediaan')->cascadeOnDelete();
            $table->dateTime('waktu_mulai_dijadwalkan');
            $table->integer('durasi_menit')->default(15);
            $table->string('link_video_conference')->unique();
            $table->string('room_name')->unique();
            $table->enum('status_sesi', ['Dipesan', 'Dikonfirmasi', 'Berlangsung', 'Selesai', 'Batal', 'Tidak Hadir'])->default('Dipesan');
            $table->text('ringkasan_konsultasi')->nullable();
            $table->text('rekomendasi_petugas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sesi_konsultasi');
    }
};
