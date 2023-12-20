<?php

namespace App\Http\Controllers;

use App\Exceptions\ReservationException;
use App\Models\Booked_room;
use App\Models\Item_image;
use App\Models\Room;
use App\Models\User;
use App\Notifications\SendNotif;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class RoomController extends Controller
{

    public function testNotif()
    {
        $user = auth()->user();

        $user = new User([
            'name' => 'John Doe',
            'email' => ''
        ]);

        $user->notify(new SendNotif());
        
        return response()->json([
            'code' => 200,
            'message' => 'success',
        ], 200);
    }

    // show / get all room data with pagination
    public function showAllRoom() // this function is for show all room on database
    {
        try {

            $rooms = Room::all();

            #get image with storage link
            foreach ($rooms as $room) {
                $room->image = Storage::url($room->image);
            }

            if ($rooms == null) {
                return response()->json([
                    'code' => 200,
                    'data' => [
                        'rooms' => [],
                    ], // 'room still empty
                    'message' => 'room still empty',
                ], 200);
            }
            //valid data
            return response()->json([
                'code' => 200,
                'data' => [
                    'rooms' => $rooms
                ],
                'message' => 'Success to get all room!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 404,
                'error' => $e->getMessage(), // 'room not found
                'message' => 'Room not found',
            ], 404);
        }
    }

    // show / get all room data with pagination
    public function showAllRoomWithPagination() // this function is for show all room on database
    {
        try {
            $query = Room::paginate(10);

            $data = $query->toArray();

            $rooms = [
                'rooms' => $data['data'],
                'current_page' => $data['current_page'],
                'total' => $data['total'],
                'per_page' => $data['per_page'],
                'last_page' => $data['last_page'],
                'next_page_url' => $data['next_page_url'],
                'prev_page_url' => $data['prev_page_url'],
            ];
            //chunk

            if ($rooms['rooms'] == null) {
                return response()->json([
                    'code' => 200,
                    'data' => [
                        'rooms' => [],
                    ], // 'room still empty
                    'message' => 'room still empty',
                ], 200);
            }
            //valid data
            return response()->json([
                'code' => 200,
                'data' => $rooms,
                'message' => 'Success to get all room!',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 404,
                'error' => $e->getMessage(), // 'room not found
                'message' => 'Room not found',
            ], 404);
        }
    }

    public function showRoomById($id)
    {
        try {
            //find room by id find of fail
            $room = Room::findOrFail($id);

            $room->image = Storage::url($room->image);

            return response()->json([
                'code' => 200,
                'message' => 'success',
                'data' => $room,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 404,
                'error' => $e->getMessage(), // 'room not found
                'message' => 'room not found',
            ], 404);
        }
    }


    public function createRoom(Request $request)
    {
        try {
            // Validation
            $validator = Validator::make($request->all(), [

                'name' => 'required|unique:rooms,name', // Use 'title' for the unique rule
                'description' => 'required',
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg',
                'location' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors(),
                    'message' => 'validation error while creating room',
                    'code' => 422, // Unprocessable Entity
                ], 422);
            }
            DB::beginTransaction();

            $image_link = null;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $image_title = $image->getClientOriginalName();

                if (!in_array($image->getClientOriginalExtension(), ['jpg', 'png', 'jpeg'])) {
                    DB::rollBack();
                    return response()->json([
                        'error' => 'Invalid image extension. Please upload a JPG or PNG image.',
                        'message' => 'Error while creating room',
                        'code' => 422, // Unprocessable Entity
                    ], 422);
                }

                $image_link = Storage::putFileAs('public/images/rooms', $image, $image_title);
            }



            $item = Room::create([
                'id' => Uuid::uuid4()->toString(), // Generate a new UUID
                'name' => $request->input('name'),
                'quantity' => $request->input('quantity'),
                'description' => $request->input('description'),
                'image' => $image_link,
                'location' => $request->input('location'),
            ]);

            DB::commit();

            return response()->json([
                'code' => 200,
                'data' => [
                    'room' => $item,
                ],
                'message' => 'Item has been created',
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Error while creating room',
                'code' => 500, // Internal Server Error
            ], 422);
        }
    }

    public function updateRoom(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|exists:rooms,id',
                'name' => 'unique:rooms,name',
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg',
            ]);
            #get id
            $room = Room::findOrFail($request->id);
            #update only if attribute is not null

            DB::beginTransaction();
            // Update only if the request data is not null
            if ($request->has('name') && $request->name != null && $request->name != '') {
                $room->name = $request->name;
            }

            if ($request->has('description') && $request->description != null && $request->description != '') {
                $room->description = $request->description;
            }

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $image_title = imgExtention($image);
                $image = Storage::putFileAs(
                    'public/images/rooms',
                    $request->file('image'),
                    $image_title
                );
                $image_link = $image;
                $room->image = $image_link;
            }

            $room->save();
            DB::commit();

            return response()->json([
                'code' => 200,
                'data' => [
                    'room' => $room,
                ],
                'message' => 'Item has been updated',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'code' => 404,
                'error' => $e->getMessage(), // 'room not found
                'message' => 'Cannot update room',
            ], 404);
        }
    }

    public function deleteRoom($id)
    {
        try {
            $room = Room::findOrFail($id);
            $room->delete();
            return response()->json([
                'code' => 200,
                'data' => [
                    'room' => $room,
                ],
                'message' => 'Item has been deleted',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 422,
                'error' => $e->getMessage(), // 'room not found
                'message' => 'Cannot delete room',
            ], 404);
        }
    }

    public function searchRoom(Request $request)
    {
        // validate
        $validator = Validator::make($request->all(), [
            'keyword' => 'required|string',
            'per_page' => 'integer',
            'sort_by' => 'string|in:name,created_at,updated_at',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors(),
                'message' => 'validation error while searching room',
                'code' => 422, // Unprocessable Entity
            ], 422);
        }

        $keyword = $request->input('keyword');
        $perPage = $request->input('per_page', 10) ? $request->input('per_page', 10) : 10;
        $sortBy = $request->input('sort_by', 'name') ? $request->input('sort_by', 'name') : 'name';
        $sortDirection = $request->input('sort_direction', 'asc');

        $cacheKey = 'room_search_' . md5($keyword . $perPage . $sortBy . $sortDirection);

        try {
            // Attempt to retrieve data from cache
            $rooms = Cache::remember($cacheKey, 60, function () use ($keyword, $perPage, $sortBy, $sortDirection) {
                $query = Room::where('name', 'like', '%' . $keyword . '%');

                $query = $query->orderBy($sortBy, $sortDirection)->paginate($perPage);

                $data = $query->toArray();

                $rooms = $data['data'];
                return [
                    'rooms' => $rooms,
                    'current_page' => $data['current_page'],
                    'total' => $data['total'],
                    'per_page' => $data['per_page'],
                    'last_page' => $data['last_page'],
                    'next_page_url' => $data['next_page_url'],
                    'prev_page_url' => $data['prev_page_url'],
                ];
                // return $query;
            });

            return response()->json([
                'data' => $rooms,
                'message' => 'Room has been found!',
                'code' => '200',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Error while searching room',
                'code' => 422, // Unprocessable Entity
            ], 500);
        }
    }

    public function reserveRoom(Request $request, Booked_room $booked_room)
    {

        // $validator = Validator::make($request->all(), [
        //     'room_id' => 'required|exists:rooms,id',
        //     'user_id' => 'required|exists:users,id',
        //     'start_date' => 'required|date',
        //     'end_date' => 'required|date',
        //     'start_time' => 'required|date_format:H:i',
        //     'end_time' => 'required|date_format:H:i',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json([
        //         'error' => $validator->errors(),
        //         'message' => 'validation error while reserving room',
        //         'code' => 422, // Unprocessable Entity
        //     ], 422);
        // }

        try {
            DB::beginTransaction();
            // where room with "id" is available on that date and time
            $rooms = Room::where('id', $request->room_id)->where('is_available', true)->firstOrFail();
            // check if room is available on from reservation table

            if ($booked_room::where('user_id', $request->user_id)
                ->where('item_id', $request->item_id)
                ->where('reservation_start_time', '<=', $request->reservation_date_start . ' ' . $request->reservation_time_start)
                ->where('reservation_end_time', '>=', $request->reservation_date_end . ' ' . $request->reservation_time_end)
                // optional
                ->where('status', '!=', 2)
                ->exists()
            ) {
                return response()->json([
                    'code' => 422,
                    'error' => 'You already have a reservation for this item at the specified time.',
                    'message' => 'Cannot reserve room',
                ], 422);
            }

            DB::commit(); // Commit the transaction
            return response()->json([
                'code' => 200,
                'data' => [
                    'room' => $rooms,
                ],
                'message' => 'success',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'code' => 422,
                'error' => $e->getMessage(), // 'room not found
                'message' => 'Cannot reserve room',
            ], 422);
        }
    }
    # Admin
}
