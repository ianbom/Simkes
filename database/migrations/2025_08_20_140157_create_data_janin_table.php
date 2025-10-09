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
          Schema::create('data_janin', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pemeriksaan_anc_id')->constrained('pemeriksaan_anc')->cascadeOnDelete();
            $table->foreignId('kehamilan_id')->constrained('kehamilan')->cascadeOnDelete();
            $table->integer('urutan_janin');
            $table->string('posisi_deskriptif')->nullable();
            $table->integer('denyut_jantung_janin')->nullable();
            $table->enum('posisi_janin', ['Kepala', 'Sungsang', 'Lintang', 'Belum Terdefinisi'])->nullable();
            $table->enum('pergerakan_janin', ['Aktif', 'Berkurang'])->nullable();
            $table->integer('taksiran_berat_janin')->nullable();
            $table->decimal('panjang_janin_cm', 5, 2)->nullable();

            // USG
            $table->decimal('indeks_cairan_ketuban', 4, 1)->nullable();
            $table->decimal('usg_bpd_mm', 5, 1)->nullable();
            $table->decimal('usg_hc_mm', 5, 1)->nullable();
            $table->decimal('usg_ac_mm', 5, 1)->nullable();
            $table->decimal('usg_fl_mm', 5, 1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_janin');
    }
};
