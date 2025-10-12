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
        Schema::create('riwayat_sakit_anak', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anak_id')->constrained('anak')->cascadeOnDelete();
            $table->foreignId('pemeriksaan_anak_id')->nullable()->constrained('pemeriksaan_anak')->cascadeOnDelete();
            $table->date('tanggal_sakit');
            $table->text('diagnosis');
            $table->text('gejala')->nullable();
            $table->text('tindakan_pengobatan')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_sakit_anak');
    }
};
