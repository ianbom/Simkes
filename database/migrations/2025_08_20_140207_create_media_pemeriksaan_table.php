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
        Schema::create('media_pemeriksaan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemeriksaan_anc_id')->constrained('pemeriksaan_anc')->cascadeOnDelete();
            $table->foreignId('data_janin_id')->nullable()->constrained('data_janin')->nullOnDelete();
            $table->enum('tipe_media', ['USG', 'Fisik', 'Lainnya']);
            $table->string('file_url');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_pemeriksaan');
    }
};
