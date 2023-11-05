<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventContentImages;
use App\Exceptions\ResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{

    public function createEventPost(Request $request){
        try {
            DB::beginTransaction();

            $request->validate([
                'thumbnail_image' => 'required|mimes:jpg,jpeg,png,gif',
                'title' => 'required',
                'content' => 'required',
                'images' => 'array',
                'images.*' => 'image|mimes:jpg,jpeg,png,gif',
            ], [
                'thumbnail_image.required' => 'Foto thumbnail tidak boleh kosong.',
                'thumbnail_image.mimes' => 'Format thumbnail harus berekstensi .jpg, .jpeg, .gif, atau .png.',
                'title.required' => 'Judul tidak boleh kosong.',
                'content.required' => 'Konten tidak boleh kosong.',
                'images.array' => 'Foto harus dikirim dalam bentuk array.',
                'images.*.mimes' => "Foto harus berekstensi .jpg, .jpeg, .gif, atau .png."
            ]);

            // content processing
            $thumbnailImage = $request->file('thumbnail_image');
            $thumbnailImageName = time() . '_' . Str::random(10) . '.' . $thumbnailImage->getClientOriginalExtension();
            $thumbnailPath = $thumbnailImage->storeAs('event/thumbnails', $thumbnailImageName, 'public');

            Event::insert([
                'thumbnail_image' => $thumbnailPath,
                'title' => $request->title,
                'content' => $request->content
            ]);

            $eventID = DB::getPdo()->lastInsertId();

            // images processing
            $imageLinks = [];
            $images = $request->file('images') ?? [];
            foreach ($images as $image){
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
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getSpecificEventPost($id){
        try {

            $post = Event::find($id);

            if (!$post){
                throw new ResponseException(404, "Event post is not found");
            }

            return response()->json([
                'message' => "Successfully fetched all event posts data.",
                'data' => $post
            ], 200);

        } catch (Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateEventPost(Request $request, $id){
        try {

            DB::beginTransaction();

            $request->validate([
                'thumbnail_image' => 'required|mimes:jpg,jpeg,png,gif',
                'title' => 'required',
                'content' => 'required',
                'images' => 'array',
                'images.*' => 'image|mimes:jpg,jpeg,png,gif',
            ], [
                'thumbnail_image.required' => 'Foto thumbnail tidak boleh kosong.',
                'thumbnail_image.mimes' => 'Format thumbnail harus berekstensi .jpg, .jpeg, .gif, atau .png.',
                'title.required' => 'Judul tidak boleh kosong.',
                'content.required' => 'Konten tidak boleh kosong.',
                'images.array' => 'Foto harus dikirim dalam bentuk array.',
                'images.*.mimes' => "Foto harus berekstensi .jpg, .jpeg, .gif, atau .png."
            ]);

            $post = Event::find($id);

            if (!$post){
                throw new ResponseException(404, "Event post is not found");
            }

            // get all images from database

            // for each image, search the image name on the img tag on the content
            // - if it exists, then don't delete, else consider it as new image (stored on the `images` response body)

            $postImages = $post->images;

            $unusedImages = [];
            foreach($postImages as $image){
                $url = $image->url;
                $urlOccurence = substr_count(strtolower($request->content), strtolower($url));
                if ($urlOccurence <= 0){ // doesn't exist on new content text, hence delete
                    array_push($unusedImages, $image->id);
                    if (Storage::disk('public')->exists($url)) {
                        Storage::disk('public')->delete($url);
                    }
                }
            }
            EventContentImages::whereIn('id', $unusedImages)->delete();

            // new images processing
            $imageLinks = [];
            $images = $request->file('images') ?? [];
            foreach ($images as $image){
                $imageName = $image->getClientOriginalName();
                $imagePath = $image->storeAs('event/images', $imageName, 'public');
                array_push($imageLinks, ['url' => $imagePath, 'event_id' => $post->id]);
            }

            EventContentImages::insert($imageLinks);

            // delete old thumbnail
            $thumbnailImage = $post->thumbnail_image;
            if (Storage::disk('public')->exists($thumbnailImage)) {
                Storage::disk('public')->delete($thumbnailImage);
            }

            // update thumbnail, title, content
            $thumbnailImage = $request->file('thumbnail_image');
            $thumbnailImageName = time() . '_' . Str::random(10) . '.' . $thumbnailImage->getClientOriginalExtension();
            $thumbnailPath = $thumbnailImage->storeAs('event/thumbnails', $thumbnailImageName, 'public');

            $post->update([
                'thumbnail_image' => $thumbnailPath,
                'title' => $request->title,
                'content' => $request->content
            ]);

            DB::commit();
            return response()->json([
                'message' => "Event updated successfully."
            ], 201);

        } catch (Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteEventPost($id){
        try {
            DB::beginTransaction();

            $post = Event::find($id);

            if (!$post){
                throw EventException::notFound();
            }

            // clean up the related images

            // thumbnail image
            $thumbnailImage = $post->thumbnail_image;

            if (Storage::disk('public')->exists($thumbnailImage)) {
                Storage::disk('public')->delete($thumbnailImage);
            }

            // content images
            $contentImages = $post->images;
            foreach($contentImages as $image){
                $imagePath = $image->url ?? "";
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $post->delete();

            DB::commit();
            return response()->json([
                'message' => "Event deleted successfully."
            ], 201);
        } catch (Exception $e){
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
