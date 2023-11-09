<?php

namespace App\Http\Controllers\Reservation;

use App\Http\Controllers\Controller;
use App\Models\Booked_room;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RoomReservationController extends Controller
{
    public function showAllRoomReservationStatusOnGoing()
    {
        //get all room reservation status on going for future user
        $room_reservation = Booked_room::paginate(10);
        // sort by reservation start time
        $room_reservation = $room_reservation->sortBy('reservation_start_time');
        return response()->json([
            'code' => 200,
            'data' => [
                'room_reservation' => $room_reservation,
            ],
            'message' => 'Success',
        ]);
    }


    public function reserveRoom(Request $request)
    {
        //reserve room
        try {
            $validator = Validator::make($request->all(), [
                'room_id' => 'required|exists:rooms,id',
                'user_id' => 'required|exists:users,id',
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
                    'error' => $validator->errors(),
                    'message' => "Validation failed, re-check your input",
                ]);
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
                ->where(function ($query) use ($start_time, $end_time) {
                    $query->where(function ($q) use ($start_time, $end_time) {
                        $q->whereBetween('reservation_start_time', [$start_time, $end_time])
                            ->orWhereBetween('reservation_end_time', [$start_time, $end_time]);
                    });
                })
                ->exists();

            if ($clashingBookings) {
                return response()->json(['message' => 'Booking clashes with existing reservation.'], 400);
            }

            // Calculate the booking duration
            $startTime = Carbon::parse($request->input('start_date'));
            $endTime = Carbon::parse($request->input('end_date'));
            $bookingDuration = $endTime->diffInHours($startTime);

            // Check if booking duration exceeds the maximum allowed hours (4 hours in this example)
            $maxBookingHours = 4;

            if ($bookingDuration > $maxBookingHours) {
                return response()->json(['message' => 'Booking duration exceeds the maximum allowed hours.'], 400);
            }

            // check if the user has already booked the room 

            DB::beginTransaction();
            // Create the reservation
            $reservation = new Booked_room([
                'user_id' => $request->input('user_id'), // Assuming the user is already logged in, otherwise you can use 'auth()->user()->id
                'room_id' => $room->id,
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
            ]);
            $reservation->save();

            return response()->json([
                'code' => 200,
                'data' => [
                    'reservation' => $reservation,
                ],
                'message' => 'Reservation created successfully!',
            ], 200);
            DB::commit();
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'error' => $e->getMessage(),
                'message' => 'Reservation failed!',
            ]);
            DB::rollBack();
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


    public function cancelRoomReservation(Request $request)
    {
        try {
            $room_reservation = Booked_room::findOrFail($request->input('id'));
            $room_reservation->status = 3;
            $room_reservation->save();
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'error' => $e->getMessage(),
                'message' => 'Room reservation failed to cancel!',
            ]);
        }
    }
}
