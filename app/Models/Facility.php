<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Facility extends Model
{
    use HasFactory;

    public $fillable = [
        'kode',
        'name',
        'position',
        'description',
        'type',
    ];

    public $timestamps = true;

    // help to make date formated better
    public $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected function value(): Attribute
    {
        return Attribute::make(
            // convert value to storage link
            get: function () {
                if ($this->type == 'image') {
                    return Storage::url($this->attributes['value']);
                } else {
                    return $this->attributes['value'];
                }
            },

            set: function ($value) {
                if ($this->type == 'image') {
                    return $this->attributes['value'] = Str::slug($value);
                } else {
                    return $this->attributes['value'] = $value;
                }
            }
        );
    }

    public function getAllData() //with caching
    {
        $key = 'facility';
        $facility  = new \App\Models\Facility();
        if (Cache::has($key)) {
            $facility = Cache::get($key);
        } else {
            $facility = $facility->getAllEntryData();
            Cache::put($key, $facility, 10000);
        }
        return $facility;
    }

    public function getValueByTitle($kode)
    {
        $facility = Facility::where('kode', $kode)->first();
        return $facility->value;
    }

    public function getAllEntryData()
    {
        $facility = Facility::all();
        $facilitydata = [];
        foreach ($facility as $key => $value) {
            $facilitydata[$value->kode] = $value->value;
        }
        return $facilitydata;
    }
}

