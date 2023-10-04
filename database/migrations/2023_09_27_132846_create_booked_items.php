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
        Schema::create('booked_items', function (Blueprint $table) {
            $table->id();
            $table->string('item_id');
            $table->string('user_id');
            $table->integer('quantity')->default(1);
            $table->integer('status')->default(0);
            $table->timestamp('reservation_start_time')->useCurrent()->nullable();
            $table->timestamp('reservation_end_time')->useCurrent()->nullable();
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booked_items');
    }
};
