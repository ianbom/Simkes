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
        Schema::create('riwayat_imunisasi_anak', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anak_id')->constrained('anak')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('pemeriksaan_anak_id')->nullable()->constrained('pemeriksaan_anak')->cascadeOnDelete();
            $table->enum('jenis_vaksin', ['BCG', 'Polio', 'DPT-HB-Hib-1', 'Campak', 'Lainnya']);
            $table->date('tanggal_pemberian');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_imunisasi_anak');
    }
};
