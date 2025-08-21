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
        // --- Skrining Perkembangan ---
        Schema::create('skrining_perkembangan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemeriksaan_anak_id')->constrained('pemeriksaan_anak')->cascadeOnDelete();
            $table->string('metode_skrining')->default('KPSP');
            $table->string('kelompok_usia_kpsp', 20)->nullable();
            $table->integer('jumlah_jawaban_ya')->nullable();
            $table->enum('hasil_skrining', ['Sesuai', 'Meragukan', 'Penyimpangan'])->nullable();
            $table->text('rekomendasi_intervensi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skrining_perkembangan');
    }
};
