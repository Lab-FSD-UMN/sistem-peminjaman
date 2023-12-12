<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booked_room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'user_id',
        'status', // '0: pending, 1: approved, 2: rejected, 3: canceled'
        'reservation_start_time',
        'reservation_end_time',
        'note',
    ];

    protected $casts = [
        'reservation_start_time' => 'datetime:l, Y-m-d H:i:s', // l represents the full day name
        'reservation_end_time' => 'datetime:l, Y-m-d H:i:s',
        'created_at' => 'datetime:l, Y-m-d H:i:s',
        'updated_at' => 'datetime:l, Y-m-d H:i:s',
    ];

    protected function Status(): Attribute
    {
        return Attribute::make(
            // convert value to storage link
            // get: fn ($value) => ["pending", "approved", "rejected"][$value],
        );
    }


    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'Guest',
        ]);
    }
}
