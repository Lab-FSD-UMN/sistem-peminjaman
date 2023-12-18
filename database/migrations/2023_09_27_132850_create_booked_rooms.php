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
        Schema::create('booked_rooms', function (Blueprint $table) {
            $table->id();
            $table->string('room_id');
            $table->string('user_id');
            $table->timestamp('reservation_start_time')->useCurrent()->nullable();
            $table->timestamp('reservation_end_time')->useCurrent()->nullable();
            $table->string('note')->nullable();
            $table->integer('status')->default(0)->comment('0: pending, 1: approved, 2: rejected, 3: canceled',);
            $table->timestamps();

            // Define a foreign key constraint with cascade delete
            $table->foreign('room_id')
                ->references('id')
                ->on('rooms')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booked_rooms');
    }
};
