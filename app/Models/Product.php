<?php

namespace App\Models;

// use Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Models\Image;

class Product extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'slug',
        'description',
        'image',
        'price',
    ];

    protected $casts = [
        'created_at' => 'datetime:l, Y-m-d H:i:s', // l represents the full day name
        'updated_at' => 'datetime:l, Y-m-d H:i:s'
    ];


    public $timestamps = true;


    public function Title(): Attribute
    {
        return Attribute::make(
            // convert value to uppercase
            get: fn ($value) => ucfirst($value),
            // set: fn ($value) =>  Str::ucfirst($value)
        );
    }

    protected function Slug(): Attribute
    {
        return Attribute::make(
            // convert slug to lowercase and remove space with dash
            get: fn ($value) => Str::slug($value),
            set: fn ($value) => Str::slug($value)
        );
    }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }



    public function getAllProductWithCache()
    {
        $productData = Product::with('image')
            ->orderBy('created_at', 'desc')
            ->paginate(16   );

        return $productData;
    }

    public function AddProduct($request)
    {
        $product = new Product();
        $image = new Image();

        $image_name = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension());
            Storage::putFileAs(
                'public',
                $request->file('image'),
                $image_name
            );
        }

        $image = Image::create([
            'image' => $image_name,
        ]);



        $product->fill($request->only([
            'title',
            'slug',
            'description',
            'price',
        ]));
        $product->image_id = $image->id;
        $product->save();
    }


    public function UpdateProduct($request)
    {
        $product = $this->find($request->id);
        $image_name = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension());
            Storage::putFileAs(
                'public',
                $request->file('image'),
                $image_name
            );
            $image = Image::create([
                'image' => $image_name,
            ]);
            $product->image_id = $image->id;
        }

        $product->fill($request->only([
            'title',
            'slug',
            'description',
            'price',
        ]));
        $product->save();
    }


    public function DeleteProduct($id)
    {
        $product = $this->find($id);
        Storage::delete('public/' . $product->image);
        $product->delete();
    }


    private function uploadImage($image)
    {
        if ($image) {
            $image_name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();
            Storage::putFileAs(
                'public',
                $image,
                $image_name
            );

            return $image_name;
        }

        return null;
    }
}