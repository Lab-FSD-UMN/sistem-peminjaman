<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Exceptions\CustomException;
use App\Exceptions\ReservationException;
use App\Models\Booked_item;
use App\Models\Booked_room;
use App\Models\Item_image;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class RoomReservationController extends Controller
{

    public function showRoomReservationPage()
    {
        return Inertia::render('Reservation/ReservationGroup/Room/ReservationRoomPage');
    }

    public function showRoomReservationDetailPage($id)
    {

        return Inertia::render('Reservation/ReservationGroup/Room/ReservationRoomDetailPage');
    }

    public function showUserRoomReservationList()
    {
        $Booked_rooms = Booked_room::where('user_id', auth()->id())
            ->with('room')
            ->get();

        $data = [
            'status' => 200,
            'message' => "Successfully fetched user's reservation data.",
            'userReservation' => $Booked_rooms,
        ];

        return response()->json($data, 200);
    }

}
