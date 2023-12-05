<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;
use App\Exceptions\ResponseException;

class RoomController extends Controller
{
    public function showAllRooms()
    {
        return response()->json([
            'status' => 200,
            'message' => "Successfully fetched room data.",
            'data' => Room::all(),
        ], 200);
    }

    public function getRoomById($id)
    {
        $room = Room::find($id);

        if (!$room){
            throw new ResponseException(404, "Room is not found");
        }

        return response()->json([
            'message' => "Successfully fetched room detail.",
            'data' => $room
        ], 200);
    }


}
