<?php

namespace App\Models;

use App\Models\EventContentImages;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'thumbnail_image',
        'title',
        'content'
    ];

    public function images()
    {
        return $this->hasMany(EventContentImages::class);
    }
}
