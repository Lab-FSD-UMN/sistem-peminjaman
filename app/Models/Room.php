<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class Room extends Model
{
    use HasFactory;


    // //boot to insert uuid
    // protected static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($model) {
    //         $model->id = Uuid::uuid4()->toString();
    //     });
    // }

    protected $fillable = [
        'id',
        'image',
        'name',
        'image',
        'is_available',
        'description',
    ];

    protected $casts = [
        'id' => 'string',
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
