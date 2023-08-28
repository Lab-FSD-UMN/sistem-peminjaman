<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
    ];

    protected function Image(): Attribute
    {
        return Attribute::make(
            // convert value to storage link
            get: fn ($value) => Storage::url($value),
            set: fn ($value) => Str::slug($value),
        );
    }
}