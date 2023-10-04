<?php

namespace App\Http\Controllers;

use App\Models\Booked_item;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Exceptions\CustomException;
use App\Exceptions\ReservationException;

class ReservationController extends Controller
{
    public function index()
    {

        return Inertia::render('Reservation/ReservationPage');
    }


    public function admindashboard()
    {

        $items = Item::all();
        return Inertia::render(
            'Admin/Reservation/ReservationDashboardPage',
            [
                'items' => $items,
            ]
        );
    }


    public function createItem(Request $request, Item $item)
    {
        try {
            DB::beginTransaction();
            $request->validate([
                'name' => 'required',
            ]);

            $item->create([
                'name' => $request->name,
                'quantity' => $request->quantity,
                'description' => $request->description,
                'image' => $request->image,
            ]);

            // return redirect()->route('reservation.item')->with('success', 'Item has been created');
            DB::commit();
            return response()->json([
                'message' => 'Item has been created',
            ], 200);
        } catch (CustomException $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }


    public function myReservation()
    {
        $userReservation = Booked_item::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Reservation/ReservationGroup/MyReservation/MyReservationPage', [
            'userReservation' => $userReservation
        ]);
    }


    public function room()
    {
        return Inertia::render('Reservation/ReservationGroup/Room/ReservationRoomPage');
    }

    public function roomDetail($id)
    {

        return Inertia::render('Reservation/ReservationGroup/Room/ReservationRoomDetailPage');
    }





    public function item()
    {
        return Inertia::render('Reservation/ReservationGroup/Item/ReservationItemPage', [
            'items' => Item::all()
        ]);
    }

    public function itemDetail($id)
    {
        return Inertia::render('Reservation/ReservationGroup/Item/ReservationItemDetailPage', [
            'item' => Item::find($id)
        ]);
    }

    // function for item reservation
    public function itemReserve(Request $request, Booked_item $Booked_item, Item $item)
    {
        try {
            DB::beginTransaction();
            // Validate the incoming request data
            $validation = [
                'item_id' => 'required',
                'user_id' => 'required',
                'quantity' => 'required',
                'reservation_date_start' => 'required',
                'reservation_date_end' => 'required',
                'reservation_time_start' => 'required',
                'reservation_time_end' => 'required',
            ];

            // Validate the incoming request data
            // if ($request->validate($validation)) {
            //     // $error_message = "Invalid request data.";
            //     throw  ReservationException::Custom('Invalid request data.');
            // }

            if ($request->quantity > $item::find($request->item_id)->quantity) {
                throw ReservationException::Custom("Invalid reservation quantity.");
            }
            // 


            // Combine date and time strings to create timestamps
            $startDateTime = $request->reservation_date_start . ' ' . $request->reservation_time_start;
            $endDateTime = $request->reservation_date_end . ' ' . $request->reservation_time_end;

            // Convert timestamps to Carbon instances (assuming 'reservation_start_time' and 'reservation_end_time' are Carbon attributes in your model)
            $startDateTime = Carbon::parse($startDateTime);
            $endDateTime = Carbon::parse($endDateTime);

            // Check if the start time is before the end time
            if ($startDateTime >= $endDateTime) {
                throw ReservationException::Custom('Invalid reservation times.');
            }

            // Use a database transaction to ensure data consistency

            // scopeNotClashing($startDateTime, $endDateTime)->exists()
            // Check if the item is available
            if ($Booked_item::notClashing($startDateTime, $endDateTime)->exists()) {
                throw ReservationException::Custom('The reservation clashes with an existing one.');
            }
            // Insert the reservation into the database within the transaction
            $Booked_item->create([
                'item_id' => $request->item_id,
                // 'user_id' => auth()->user()->id,
                'user_id' => $request->user_id,
                'quantity' => $request->quantity,
                'reservation_start_time' => $startDateTime,
                'reservation_end_time' => $endDateTime,
                'note' => $request->note,
            ]);

            // Commit the transaction
            DB::commit();
            return redirect()->route('reservation.item')->with('success', 'Item has been reserved');
        } catch (ReservationException $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }
}
