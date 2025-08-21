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
        Schema::create('riwayat_medis_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->enum('golongan_darah', ['A', 'B', 'AB', 'O'])->nullable();
            $table->enum('rhesus', ['+', '-'])->nullable();
            $table->integer('jumlah_keguguran')->default(0);
            $table->text('riwayat_alergi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_medis_user');
    }
};
