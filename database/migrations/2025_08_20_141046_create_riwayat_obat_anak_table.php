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
        Schema::create('riwayat_obat_anak', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anak_id')->constrained('anak')->cascadeOnDelete();
            $table->foreignId('obat_id')->constrained('obat_master')->cascadeOnDelete();
            $table->foreignId('pemeriksaan_anak_id')->constrained('pemeriksaan_anak')->cascadeOnDelete();
            $table->string('dosis')->nullable();
            $table->date('tanggal_pemberian');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_obat_anak');
    }
};
