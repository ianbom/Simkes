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
      Schema::create('kehamilan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->integer('kehamilan_ke');
            $table->date('hpht');
            $table->date('hpl');
            $table->decimal('tinggi_badan_awal', 5, 1);
            $table->integer('jumlah_janin')->default(1);
            $table->enum('status', ['Aktif', 'Selesai', 'Keguguran'])->default('Aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kehamilan');
    }
};
