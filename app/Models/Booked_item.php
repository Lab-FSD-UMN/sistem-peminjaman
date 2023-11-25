<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booked_item extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'user_id',
        'quantity',
        'status',
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


    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'Guest',
        ]);
    }


    public function scopeAvailable($query)
    {
        return $query->where('status', 1);
    }

    public static function scopeNotClashing($query, $newReservationStartTime, $newReservationEndTime)
    {
        return $query->where(function ($query) use ($newReservationStartTime, $newReservationEndTime) {
            $query->where(function ($subquery) use ($newReservationStartTime, $newReservationEndTime) {
                $subquery->where(function ($innerSubquery) use ($newReservationStartTime, $newReservationEndTime) {
                    $innerSubquery->whereBetween('reservation_start_time', [$newReservationStartTime, $newReservationEndTime])
                        ->orWhereBetween('reservation_end_time', [$newReservationStartTime, $newReservationEndTime]);
                });
            });
        });
    }

    // return model that clash with the new reservation
    
}
