<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;


    protected $fillable = [
        'id',
        'image',
        'name',
        'image',
        'is_available',
        'description',
    ];

    protected $casts = [
        'is_available' => 'boolean',
    ];


    // room image
    // public function room_image(): HasMany
    // {
    //     return $this->hasMany(Room_Image::class);
    // }
    //mutator


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
}
