<?php

namespace App\Http\Controllers\Reservation;

use App\Http\Controllers\Controller;
use App\Models\Booked_room;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RoomReservationController extends Controller
{


    public function showRoomReservationPage()
    {
        //show room reservation page with image storage url
        $rooms = Room::all();
        foreach ($rooms as $room) {
            $room->image = Storage::url($room->image);
        }
        return Inertia::render('Reservation/ReservationGroup/Room/showRoomReservationPage', [
            'rooms' => $rooms,
        ]);
    }

    public function showRoomReservationDetailPage($id)
    {
        //show room reservation detail page
        $room = Room::findOrFail($id);
        $room->image = Storage::url($room->image);
        return Inertia::render('Reservation/ReservationGroup/Room/showReservationRoomDetailPage', [
            'room' => $room,
        ]);
    }

    public function showAllRoomReservationPending()
    {
        //get all room reservation status on going for future user
        $room_reservation = Booked_room::with('room')->where('status', 0)->get();
        //sort by reservation start time
        $room_reservation = $room_reservation->sortBy('reservation_start_time');
        return response()->json([
            'code' => 200,
            'data' => [
                'room_reservation' => $room_reservation,
            ],
            'message' => 'Success',
        ]);
    }

    public function userShowAllRoomReservationListandStatus(Request $request)
    {
        try {
            #get id from user
            // $id = $request->input('user_id');
            $id = auth()->user()->id;
            # show all reservation list and status for user
            $room_reservation = Booked_room::all()->where('user_id', $id);
            //sort by reservation start time
            $room_reservation = $room_reservation->sortBy('reservation_start_time');

            return response()->json([
                'code' => 200,
                'room_reservation' => $room_reservation,
                'message' => 'success',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 404,
                'error' => $e->getMessage(),
                'message' => 'Room reservation not found!',
            ]);
        }
    }





    public function reserveRoom(Request $request)
    {
        //reserve room
        try {
            $user = auth()->user();
            $validator = Validator::make($request->all(), [
                'room_id' => 'required|exists:rooms,id',
                // 'user_id' => 'required|exists:users,id',
                'reservation_time_start' => 'required|date_format:H:i',
                'reservation_time_end' => 'required|date_format:H:i',
                'reservation_date_start' => 'required|date',
                'reservation_date_end' => 'required|date',
                'note' => 'nullable|string',
            ]);

            # If validation fails, return the error messages
            if ($validator->fails()) {
                return response()->json([
                    'code' => 422,
                    'errors' => $validator->errors(),
                    'message' => "Validation failed, re-check your input",
                ], 422);
            }

            $room = Room::findOrFail($request->input('room_id'));

            // Check if the room is available
            if (!$room->is_available) {
                return response()->json(['message' => 'Room is not available for reservation.'], 400);
            }

            # combine date and time
            $start_time  = CombineDateTime($request->input('reservation_time_start'), $request->input('reservation_date_start'));
            $end_time  = CombineDateTime($request->input('reservation_time_end'), $request->input('reservation_date_end'));

            // Check if the requested time range clashes with existing bookings
            $clashingBookings = Booked_room::where('room_id', $room->id)
                ->where('status', 1) // only check approved bookings
                ->where(function ($query) use ($start_time, $end_time) {
                    $query->where(function ($q) use ($start_time, $end_time) {
                        $q->whereBetween('reservation_start_time', [$start_time, $end_time])
                            ->orWhereBetween('reservation_end_time', [$start_time, $end_time]);
                    });
                })
                ->exists();

            if ($clashingBookings) {
                return response()->json([
                    'code' => 422,
                    'message' => 'Booking clashes with existing reservation.'
                ], 422);
            }

            // Calculate the booking duration
            $startTime = Carbon::parse($request->input('start_date'));
            $endTime = Carbon::parse($request->input('end_date'));
            $bookingDuration = $endTime->diffInHours($startTime);

            // Check if booking duration exceeds the maximum allowed hours (4 hours in this example)
            $maxBookingHours = 4;

            if ($bookingDuration > $maxBookingHours) {
                return response()->json([
                    'code' => 422,
                    'message' => 'Booking duration exceeds the maximum allowed hours.'
                ], 422);
            }

            // check if the user has already booked the room

            DB::beginTransaction();

            $reservation = Booked_room::create([
                'user_id' => $user->id,
                'room_id' => $request->input('room_id'),
                'reservation_start_time' => $start_time,
                'reservation_end_time' => $end_time,
                'note' => $request->input('note'),
            ]);

            DB::commit();

            return response()->json([
                'code' => 200,
                'data' => [
                    'reservation' => $reservation,
                ],
                'message' => 'Reservation created successfully!!',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'code' => 422,
                'error' => $e->getMessage(),
                'message' => 'Reservation failed!',
            ], 422);
        }
    }

    public function showRoomReservationStatusOnGoingById($id)
    {
        //get room reservation status by id
        try {
            $room_reservation = Booked_room::findOrFail($id);
            return response()->json([
                'code' => 200,
                'data' => [
                    'room_reservation' => $room_reservation,
                ],
                'message' => 'Success',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 404,
                'error' => $e->getMessage(),
                'message' => 'Room reservation not found!',
            ]);
        }
    }


    public function cancelRoomReservation(Request $request, $id)
    {
        try {
            // $room_reservation = Booked_room::findOrFail($request->input('id'));
            $room_reservation = Booked_room::findOrFail($id);
            // $room_reservation->status = 3;
            #delete reservation
            $room_reservation->delete();
            return response()->json([
                'code' => 200,
                'data' => [
                    'room_reservation' => $room_reservation,
                ],
                'message' => 'Room reservation canceled successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 422,
                'error' => $e->getMessage(),
                'message' => 'Room reservation failed to cancel!',
            ]);
        }
    }


    //admin
    public function changeRoomReservationStatus(Request $request)
    {
        try {
            $validator  = Validator::make($request->all(), [
                'id' => 'required|exists:booked_rooms,id',
                'status' => 'required|integer|between:0,3',
                # 0: pending, 1: approved, 2: rejected, 3: canceled
            ]);

            # If validation fails, return the error messages
            if ($validator->fails()) {
                return response()->json([
                    'code' => 422,
                    'error' => $validator->errors(),
                    'message' => "Validation failed, re-check your input",
                ]);
            }

            $room_reservation = Booked_room::findOrFail($request->input('id'));
            $room_reservation->status = $request->input('status');
            $room_reservation->save();
            # if input status is web, redirect to web
            if ($request->web == true) {
                // return Inertia::red
                // redrect back
                return redirect()->back();
            }
            return response()->json([
                'code' => 200,
                'data' => [
                    'room_reservation' => $room_reservation,
                ],
                'message' => 'Room reservation status changed successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 422,
                'error' => $e->getMessage(),
                'message' => 'Room reservation status failed to change!',
            ]);
        }
    }
}
