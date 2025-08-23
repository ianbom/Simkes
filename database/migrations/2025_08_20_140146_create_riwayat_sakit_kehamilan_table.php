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
        Schema::create('riwayat_sakit_kehamilan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kehamilan_id')->constrained('kehamilan')->cascadeOnDelete();
            $table->foreignId('pemeriksaan_anc_id')->constrained('pemeriksaan_anc')->cascadeOnDelete();
            $table->date('tanggal_diagnosis')->nullable();
            $table->text('diagnosis')->nullable();
            $table->text('gejala')->nullable();
            $table->text('tindakan_pengobatan')->nullable();
            $table->enum('status_penyakit', ['Aktif', 'Sembuh', 'Terkontrol']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_sakit_kehamilan');
    }
};
