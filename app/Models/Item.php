<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Casts\Attribute;


use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException as ExceptionUnsatisfiedDependencyException;
use Ramsey\Uuid\Uuid;

class Item extends Model
{
    use HasFactory;


    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'image',
        'name',
        'quantity',
        'is_available',
        'description',
    ];

    protected $casts = [
        'is_available' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Uuid::uuid4()->toString();
        });
    }

    // usage: Item::available()->get();
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }


    public function scopeUnavailable($query)
    {
        return $query->where('is_available', false);
    }


    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'like', '%' . $search . '%');
    }


    /*
    [Usage of scopeNotClashing]
    $newReservationStartTime = '2023-09-28 10:00:00';
    $newReservationEndTime = '2023-09-28 12:00:00';

    $notClashingReservations = BookedRoom::notClashing($newReservationStartTime, $newReservationEndTime)->get();

    if ($notClashingReservations->isEmpty()) {
        // The new reservation does not clash with any existing ones
    } else {
        // There are existing reservations that overlap with the new one
        // You can handle this case as needed
    }
    */
    public function scopeNotClashing($query, $newReservationStartTime, $newReservationEndTime)
    {

        return $query->where(function ($query) use ($newReservationStartTime, $newReservationEndTime) {
            // Check for non-overlapping reservations
            $query->where(function ($subquery) use ($newReservationStartTime, $newReservationEndTime) {
                $subquery->where('reservation_start_time', '>=', $newReservationEndTime)
                    ->orWhere('reservation_end_time', '<=', $newReservationStartTime);
            });
        });
    }
    /*
    DB::beginTransaction();

try {
    // Check for clashes using the scope
    if (BookedRoom::notClashing($newReservationStartTime, $newReservationEndTime)->exists()) {
        // Handle clash (e.g., throw an exception or return a response)
    }

    // Create the reservation
    $reservation = new BookedRoom([
        'reservation_start_time' => $newReservationStartTime,
        'reservation_end_time' => $newReservationEndTime,
        // Other reservation data
    ]);

    $reservation->save();

    DB::commit(); // Commit the transaction
} catch (\Exception $e) {
    DB::rollback(); // Rollback the transaction in case of an exception
    // Handle the exception (e.g., log it or return an error response)
}

    
    */
}
