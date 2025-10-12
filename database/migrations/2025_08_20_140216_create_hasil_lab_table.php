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
        Schema::create('hasil_lab', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemeriksaan_anc_id')->constrained('pemeriksaan_anc')->cascadeOnDelete();
            $table->string('nama_tes');
            $table->string('hasil', 255);
            $table->string('satuan', 255)->nullable();
            $table->enum('status', ['Normal', 'Kurang Normal', 'Tidak Normal', 'Perlu Tindak Lanjut']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_lab');
    }
};
