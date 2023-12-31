<?php

use App\Models\Product;
// use Illuminate\Support\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
// use Exception;
use Illuminate\Support\Facades\DB;

function getMessage(string $string = '')
{
    return 'Hello ' . $string . '!';
}


function imgExtention($image)
{
    // Replace spaces with hyphens
    $image_name =  pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . time() . "." . $image->getClientOriginalExtension();
    $image_extention = preg_replace('/\s+/', '-', $image_name);
    // Convert to lowercase
    $image_extention = strtolower($image_extention);
    return $image_extention;
}

function FormatDate($date)
{
    // $laravel_date = '2023-08-11T14:17:47.000000Z';
    $carbon_date = Carbon::parse($date);
    $human_readable_date = $carbon_date->diffForHumans();
    return $human_readable_date;
}


function CombineDateTime(
    $date,
    $time
) {
    $date = Carbon::parse($date);
    $time = Carbon::parse($time);
    $combined_date_time = $date->format('Y-m-d') . ' ' . $time->format('H:i:s');
    return $combined_date_time;
}
function uploadImage($image, $destination_path = "", $table, $metadata){
    try {
        if (!$image){
            return [
                "success" => false,
                "message" => "Tidak ada file terlampir."
            ];
        }

        if (!Schema::hasTable($table)){
            return [
                "success" => false,
                "message" => "Tabel tidak ditemukan."
            ];
        }


        $image_name = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME) . '-' . time() . '.' . $image->getClientOriginalExtension();

        // add more tables related to image
        if ($table == "images"){
            DB::table($table)->insert([
                [
                    "title" => $metadata["title"] ?? "Image",
                    "image" => $image_name,
                    "gallery" => $metadata["gallery"] ?? false,
                ]
            ]);
        }

        // with prefix "/"
        Storage::putFileAs(
            'public'.$destination_path,
            $image,
            $image_name
        );

        return [
            "success" => true,
            "message" => "File berhasil diunggah.",
            "data" => [
                "image_name" => $image_name
            ]
        ];
    } catch (Exception $e){
        throw new Exception($e->getMessage());
    }
}
