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
        Schema::create('chat_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')
                  ->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('model_name')->default('gpt-4o-mini');
            $table->text('question');
            $table->longText('answer');
            $table->timestamps();
            $table->index('user_id');
        });

        Schema::create('chat_sources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_log_id')->constrained('chat_logs')
                  ->cascadeOnDelete()->cascadeOnUpdate();
            $table->json('sources');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_logs');
        Schema::dropIfExists('chat_sources');
    }
};
