<?php

namespace App\Models;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventContentImages extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'event_id'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

}
