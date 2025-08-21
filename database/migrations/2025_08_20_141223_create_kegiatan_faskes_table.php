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
        Schema::create('kegiatan_faskes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faskes_id')->constrained('faskes')->cascadeOnDelete();
            $table->foreignId('user_id_pembuat')->constrained('users')->cascadeOnDelete();
            $table->string('judul', 255);
            $table->text('deskripsi')->nullable();
            $table->string('gambar_url')->nullable();
            $table->date('tanggal_kegiatan');
            $table->time('jam_mulai')->nullable();
            $table->time('jam_selesai')->nullable();
            $table->string('lokasi', 255)->nullable();
            $table->enum('status_publikasi', ['Draf', 'Diterbitkan', 'Selesai', 'Dibatalkan'])->default('Draf');
            $table->timestamp('dibuat_pada')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kegiatan_faskes');
    }
};
