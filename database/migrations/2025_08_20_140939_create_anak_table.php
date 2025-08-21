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
         Schema::create('anak', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelahiran_id')->nullable()->constrained('kelahiran')->cascadeOnDelete();
            $table->string('nama')->nullable();
            $table->enum('kelamin', ['L', 'P']);
            $table->enum('status_hidup', ['Hidup', 'Meninggal']);
            $table->date('tanggal_lahir')->nullable();
            $table->date('tanggal_meninggal')->nullable();
            $table->integer('berat_lahir_gram')->nullable();
            $table->decimal('panjang_lahir_cm', 5,1)->nullable();
            $table->decimal('lingkar_kepala_cm', 5,1)->nullable();
            $table->integer('urutan_kelahiran')->nullable();
            $table->string('kondisi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anak');
    }
};
