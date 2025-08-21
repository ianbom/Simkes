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
         Schema::create('resep_obat_checkup', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemeriksaan_anc_id')->constrained('pemeriksaan_anc')->cascadeOnDelete();
            $table->foreignId('obat_id')->constrained('obat_master')->cascadeOnDelete();
            $table->string('dosis', 50)->nullable();
            $table->integer('jumlah')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resep_obat_checkup');
    }
};
