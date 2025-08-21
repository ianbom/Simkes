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
        Schema::create('riwayat_kehamilan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('tahun_persalinan')->nullable();
            $table->string('hasil_kehamilan')->nullable();
            $table->string('jenis_persalinan')->nullable();
            $table->integer('berat_lahir_gram')->nullable();
            $table->decimal('panjang_lahir_cm', 5, 2)->nullable();
            $table->decimal('lingkar_kepala_cm', 5, 2)->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_kehamilan');
    }
};
