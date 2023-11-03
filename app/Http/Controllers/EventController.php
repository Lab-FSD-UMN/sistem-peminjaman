<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventContentImages;
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
            $thumbnailImage = $request->file('thumbnail_image');
            $thumbnailPath = $thumbnailImage->storeAs('event/thumbnails', $thumbnailImageName, 'public');

            Event::insert([
                'thumbnail_image' => $thumbnailPath,
                'title' => $request->title,
                'content' => $request->content
            ]);

            $eventID = DB::getPdo()->lastInsertId();

            // images processing
            $imageLinks = [];
            foreach ($request->images as $image){
                $imageName = $image->getClientOriginalName();
                $imagePath = $image->storeAs('event/images', $imageName, 'public');
                array_push($imageLinks, ['url' => $imagePath, 'event_id' => $eventID]);
            }
            EventContentImages::insert($imageLinks);

            DB::commit();
            return response()->json([
                'message' => "Event created successfully."
            ], 201);

        } catch (Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function getAllEventPosts(){
        try {

            $posts = Event::all();

            return response()->json([
                'message' => "Successfully fetched all event posts data.",
                'data' => $posts
            ], 200);

        } catch (Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getSpecificEventPost($id){
        try {

            $post = Event::find($id);

            return response()->json([
                'message' => "Successfully fetched all event posts data.",
                'data' => $post
            ], 200);

        } catch (Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
