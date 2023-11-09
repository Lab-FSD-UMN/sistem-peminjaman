<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room_Image extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'link',
        'room_id',
    ];

    // room image
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}
