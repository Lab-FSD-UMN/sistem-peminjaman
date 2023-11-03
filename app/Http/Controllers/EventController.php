<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{

    public function createEventPost(Request $request){
        try {
            DB::beginTransaction();

            $request->validate(
                [
                    'thumbnail_image' => 'required|mimes:jpg,jpeg,png,gif',
                    'title' => 'required',
                    'content' => 'required',
                    'images' => 'array',
                    'images.*' => 'image|mimes:jpg,jpeg,png,gif',
                ],
                [
                    'thumbnail_image.required'  => 'Foto thumbnail tidak boleh kosong.',
                    'thumbnail_image.mimes' => 'Format thumbnail harus berekstensi .jpg, .jpeg, .gif, atau .png.',
                    'title.required' => 'Judul tidak boleh kosong.',
                    'content.required' => 'Konten tidak boleh kosong.',
                    'images.array' => 'Foto harus dikirim dalam bentuk array.',
                    'images.*.*' => "Foto harus berekstensi .jpg, .jpeg, .gif, atau .png."
                ]
            );

            // content processing
            Event::insert([
                'thumbnail_image' => $request->thumbnail_image,
                'title' => $request->title,
                'content' => $request->content
            ]);

            $thumbnailImage = $request->file('thumbnail_image');
            $thumbnailImageName = $thumbnailImage->getClientOriginalName();
            $thumbnailImage->storeAs('event/thumbnails', $thumbnailImageName, 'public');

            // images processing


            DB::commit();
        } catch (Exception $e){
            DB::rollBack();
        }
    }

}
