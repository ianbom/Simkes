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
        Schema::create('kelahiran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kehamilan_id')->constrained('kehamilan')->cascadeOnDelete();
            $table->foreignId('faskes_id')->constrained('faskes')->cascadeOnDelete();
            $table->dateTime('tanggal_kelahiran')->nullable();
            $table->text('tempat_persalinan')->nullable();
            $table->string('jenis_persalinan')->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelahiran');
    }
};
