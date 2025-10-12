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
        Schema::create('media_pemeriksaan_anak', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemeriksaan_anak_id')->constrained('pemeriksaan_anak')->cascadeOnDelete();
            $table->string('file_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_pemeriksaan_anak');
    }
};
