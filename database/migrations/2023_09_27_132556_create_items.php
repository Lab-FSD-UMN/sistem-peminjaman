<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            // $table->id();
            $table->string('id')->primary();
            $table->string('image')->nullable();
            $table->string('name');
            $table->integer('quantity')->default(1);;
            $table->boolean('is_available')->default(true)->comment('0: tidak tersedia, 1: tersedia');
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
