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
use App\Exceptions\ResponseException;
use App\Models\Booked_item;
use App\Models\Booked_room;
use App\Models\Item_image;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;


class ItemReservationController extends Controller
{
    public function showItemReservationPage()
    {

        // return item data with image
        // with pagination and eager loading
        $items = Item::with('item_images')->paginate(10);
        return Inertia::render('Reservation/ReservationGroup/Item/ReservationItemPage', [
            'items' => $items,
        ]);
    }

    public function showItemReservationDetailPage($id)
    {
        $item = Item::find($id)->with('item_images')->first();
        return Inertia::render('Reservation/ReservationGroup/Item/ReservationItemDetailPage', [
            'item' => $item,
        ]);
    }

    public function reserveItem(Request $request, Booked_item $Booked_item, Item $item)
    {
        try {
            DB::beginTransaction();
            // Validate the incoming request data

            $userID = auth()->user()->id;
            Log::info(auth('sanctum')->user());

            $request->validate([
                'item_id' => 'required',
                // 'user_id' => 'required',
                'quantity' => 'required',
                'reservation_date_start' => 'required',
                'reservation_date_end' => 'required',
                'reservation_time_start' => 'required',
                'reservation_time_end' => 'required',
            ]);

            // Validation: check if input data is valid
            // check if quantity is positive and not zero
            if ($request->quantity <= 0) {
                throw new ResponseException(400, 'Invalid quantity. Please enter a positive number greater than zero.');
            }


            // Validation: Check if the item is available in that given time and given quantity
            // check if available quantity - booked quantity > requested quantity in that given time

            $findItem = $item::find($request->item_id);

            if (!$findItem){
                throw new ResponseException(404, 'Item not found.');
            }

            $booked_quantity = $Booked_item::where('item_id', $request->item_id)
                // ->where('reservation_start_time', '<=', $request->reservation_date_start . ' ' . $request->reservation_time_start)
                // ->where('reservation_end_time', '>=', $request->reservation_date_end . ' ' . $request->reservation_time_end)
                ->where('status', 1)
                ->sum('quantity');


            $available_quantity = $findItem->quantity - $booked_quantity;

            if ($request->quantity > $available_quantity) {
                throw new ResponseException(400, "Insufficient quantity. try to reserve $available_quantity or less.");
            }



            // Validation: check if the user has already reserved the item in that given time
            // check if the user has already reserved the item in that given time
            if ($Booked_item::where('user_id', $userID)
                ->where('item_id', $request->item_id)
                ->where('reservation_start_time', '<=', $request->reservation_date_start . ' ' . $request->reservation_time_start)
                ->where('reservation_end_time', '>=', $request->reservation_date_end . ' ' . $request->reservation_time_end)
                // optional
                ->where('status', '!=', 2)
                ->exists()
            ) {
                throw new ResponseException(400, 'You have already reserved this item in that given time.');
            }

            // Validation: check if the reservation time is valid
            // Process the incoming request data
            // Combine date and time strings to create timestamps
            $startDateTime = $request->reservation_date_start . ' ' . $request->reservation_time_start;
            $endDateTime = $request->reservation_date_end . ' ' . $request->reservation_time_end;

            // Convert timestamps to Carbon instances (assuming 'reservation_start_time' and 'reservation_end_time' are Carbon attributes in your model)
            $startDateTime = Carbon::parse($startDateTime);
            $endDateTime = Carbon::parse($endDateTime);

            // Check if the start time is before the end time
            if ($startDateTime >= $endDateTime) {
                throw new ResponseException(400, 'Invalid reservation times.');
            }

            // Use a database transaction to ensure data consistency

            // scopeNotClashing($startDateTime, $endDateTime)->exists()
            // Check if the item is available
            // if ($Booked_item::notClashing($startDateTime, $endDateTime)->exists()) {
            //     throw ReservationException::Custom('The reservation clashes with an existing one.');
            // }
            // Insert the reservation into the database within the transaction
            $Booked_item->create([
                'item_id' => $request->item_id,
                'user_id' => $userID,
                'quantity' => $request->quantity,
                'reservation_start_time' => $startDateTime,
                'reservation_end_time' => $endDateTime,
                'note' => $request->note,
                'status' => 0,

            ]);

            // Commit the transaction
            DB::commit();
            // return redirect()->route('reservation.item')->with('success', 'Item has been reserved');
            return response()->json([
                'status' => 201,
                'message' => 'Item has been reserved',
            ], 201);
        }  catch (ResponseException $e){
            return response()->json([
                "status" => $e->getStatusCode(),
                "message" => $e->getMessage(),
            ], $e->getStatusCode());
        } catch (ReservationException $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }

    public function ChangeItemReservationStatus(Request $request)
    {
        try {
            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
                'status' => 'required',
            ]);


            $booked_item = Booked_item::find($request->id);

            if (!$booked_item){
                throw new ResponseException(404, "Requested reservation does not exist.");
            }

            $booked_item->status = $request->status;
            $booked_item->save();
            DB::commit();

            return response()->json([
                'message' => 'status has been changed',
            ], 200);
        }  catch (ResponseException $e){
            return response()->json([
                "code" => $e->getStatusCode(),
                "message" => $e->getMessage(),
            ], $e->getStatusCode());
        } catch (CustomException $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }

    public function showAdminReservationItemPage()
    {
        return Inertia::render(
            'Admin/Reservation/ReservationMenu/Submenu/Item/showAdminReservationItemPage'
        );
    }

    public function showAdminReservationItemMonitoringSchedule()
    {
        $item_schedule = Booked_item::with('user')->with('item')->get();
        // group by month and add month name
        $item_schedule = $item_schedule->groupBy(function ($item) {
            return Carbon::parse($item->reservation_start_time)->format('F');
        });
        $item_schedule = $item_schedule->toArray();

        // convert to array

        return Inertia::render(
            'Admin/Reservation/ReservationMenu/Submenu/Item/showAdminReservationItemMonitoringSchedule',
            [
                'item_schedule' => $item_schedule,
            ]
        );
    }

    public function showAdminReservationItemDataPage()
    {
        $item = Item::with('item_images')->get();
        return Inertia::render(
            'Admin/Reservation/ReservationMenu/Submenu/Item/ShowAdminReservationItemDataPage',
            [
                'items' => $item
            ]
        );
    }

    public function viewAllSelfReservations()
    {
        try {

            $user = auth()->user();

            $reservations = Booked_item::where('user_id', $user->id)->get();

            return response()->json([
                'code' => 200,
                'message' => "Successfully fetched user's reservations.",
                'data' => $reservations
            ], 200);

        } catch (Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

    }

    public function userGetReservationDetail($id){
        try {

            $user = auth()->user();

            $reservation = Booked_item::where('id', $id)
                ->where('user_id', $user->id)
                ->first();

            if (!$reservation){
                throw new ResponseException(404, "Reservation data does not exist.");
            }

            return response()->json([
                'code' => 200,
                'message' => "Successfully fetched user's reservation detail.",
                'data' => $reservation
            ], 200);

        } catch (ResponseException $e){
            return response()->json([
                "code" => $e->getStatusCode(),
                "message" => $e->getMessage(),
            ], $e->getStatusCode());
        } catch (Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function adminGetReservationDetail($id){
        try {

            $reservation = Booked_item::where('id', $id)->first();

            if (!$reservation){
                throw new ResponseException(404, "Reservation data does not exist.");
            }

            return response()->json([
                'code' => 200,
                'message' => "Successfully fetched user's reservation detail.",
                'data' => $reservation
            ], 200);

        } catch (ResponseException $e){
            return response()->json([
                "code" => $e->getStatusCode(),
                "message" => $e->getMessage(),
            ], $e->getStatusCode());
        } catch (Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function updateReservation()
    {
        // requirement blm psti
    }

    public function deleteReservation($id)
    {
        try {

            $success = Booked_item::where('id', $id)->delete();

            return response()->json([
                'code' => $success ? 200 : 404,
                'message' => $success ? "Successfully canceled reservation." : "Requested reservation does not exist."
            ], 200);

        } catch (Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
