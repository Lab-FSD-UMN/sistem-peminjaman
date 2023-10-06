<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Item_image extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'title',
        'link',
    ];


    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected function Link(): Attribute
    {
        return Attribute::make(
            // convert value to storage link
            // get: fn ($value) => Storage::url($value),
        );
    }

    // have many item
    public function item(): BelongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
