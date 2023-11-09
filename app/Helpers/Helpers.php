<?php

use App\Models\Product;
// use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

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
