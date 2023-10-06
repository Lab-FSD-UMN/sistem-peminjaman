<?php

namespace App\Http\Controllers;

use App\Models\item;
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

class ReservationController extends Controller
{
    // USER //
    // [Reservation/] Show User Reservation Dashboard Page (GET)
    public function showUserReservatioPage()
    {
        // if the user is not logged in, redirect to the login page
        if (auth()->user() == null) {
            return redirect()->route('login');
        }
        return Inertia::render('Reservation/showUserReservatioPage');
    }


    // [Reservation/Myreservation] Show all item and room reservation of user (GET)
    public function showUserReservationListAndStatusPage()
    {
        $userReservation = Booked_item::where('user_id', auth()->user()->id)->with('item')->get();
        return Inertia::render('Reservation/ReservationGroup/MyReservation/showUserReservationListAndStatusPage', [
            'userReservation' => $userReservation
        ]);
    }


    public function showRoomReservationPage()
    {
        return Inertia::render('Reservation/ReservationGroup/Room/ReservationRoomPage');
    }

    public function showRoomReservationDetailPage($id)
    {

        return Inertia::render('Reservation/ReservationGroup/Room/ReservationRoomDetailPage');
    }


    public function showItemReservationPage()
    {

        // return item data with image
        $items = Item::with('item_images')->get();
        return Inertia::render('Reservation/ReservationGroup/Item/ReservationItemPage', [
            'items' => $items
        ]);
    }

    public function showItemReservationDetailPage($id)
    {
        $item = Item::find($id)->with('item_images')->first();
        return Inertia::render('Reservation/ReservationGroup/Item/ReservationItemDetailPage', [
            'item' => $item
        ]);
    }

    // function for item searching
    public function searchItemData(Request $request)
    {
        $keyword = $request->input('keyword');
        $perPage = $request->input('per_page', 10);
        $sortBy = $request->input('sort_by', 'name');
        $sortDirection = $request->input('sort_direction', 'asc');

        $cacheKey = 'item_search_' . md5($keyword . $perPage . $sortBy . $sortDirection);

        try {
            // Attempt to retrieve data from cache
            $items = Cache::remember($cacheKey, 60, function () use ($keyword, $perPage, $sortBy, $sortDirection) {
                $query = Item::where('name', 'like', '%' . $keyword . '%')->with('item_images');
                // You can add additional search criteria here if needed.
                // For example:
                // $query->where('category_id', '=', $categoryId);

                return $query->orderBy($sortBy, $sortDirection)->paginate($perPage);
            });

            return response()->json([
                'items' => $items,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while searching for items.',
            ], 500);
        }
    }


    // function for item reservation
    public function reserveItem(Request $request, Booked_item $Booked_item, Item $item)
    {
        try {
            DB::beginTransaction();
            // Validate the incoming request data

            $request->validate([
                'item_id' => 'required',
                'user_id' => 'required',
                'quantity' => 'required',
                'reservation_date_start' => 'required',
                'reservation_date_end' => 'required',
                'reservation_time_start' => 'required',
                'reservation_time_end' => 'required',
            ]);

            // Validation: check if input data is valid
            // check if quantity is positive and not zero
            if ($request->quantity <= 0) {
                throw ReservationException::Custom('Invalid quantity. Please enter a positive number greater than zero.');
            }


            // Validation: Check if the item is available in that given time and given quantity
            // check if available quantity - booked quantity > requested quantity in that given time
            $booked_quantity = $Booked_item::where('item_id', $request->item_id)
                ->where('reservation_start_time', '<=', $request->reservation_date_start . ' ' . $request->reservation_time_start)
                ->where('reservation_end_time', '>=', $request->reservation_date_end . ' ' . $request->reservation_time_end)
                ->sum('quantity');

            $available_quantity = $item::find($request->item_id)->quantity - $booked_quantity;

            if ($request->quantity > $available_quantity) {
                throw ReservationException::Custom("Insufficient quantity. try to reserve $available_quantity or less.");
            }

            // Validation: check if the user has already reserved the item in that given time
            // check if the user has already reserved the item in that given time
            if ($Booked_item::where('user_id', $request->user_id)
                ->where('item_id', $request->item_id)
                ->where('reservation_start_time', '<=', $request->reservation_date_start . ' ' . $request->reservation_time_start)
                ->where('reservation_end_time', '>=', $request->reservation_date_end . ' ' . $request->reservation_time_end)
                // optional
                ->where('status', '!=', 2)
                ->exists()
            ) {
                throw ReservationException::Custom('You have already reserved this item in that given time.');
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
                throw ReservationException::Custom('Invalid reservation times.');
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
                // 'user_id' => auth()->user()->id,
                'user_id' => $request->user_id,
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
                'message' => 'Item has been reserved',
            ], 200);
        } catch (ReservationException $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }

    // ADMIN //


    // [Reservation/] Show Admin Reservation Dashboard Page (GET)
    public function showAdminReservationDashboardPage()
    {
        return Inertia::render(
            'Admin/Reservation/ReservationDashboardPage',
        );
    }

    // [Reservation/List] Show Update of User Reservation (GET)
    public function showAdminReservationListPage()
    {
        // get all booked items
        // $booked_items = Booked_item::with('user')->with('item')->get();
        $booked_items = Booked_item::with('user')->with('item')->where('status', 0)->get();
        // get all booked rooms 
        $booked_rooms = Booked_room::with('user')->with('room')->get();
        return Inertia::render(
            'Admin/Reservation/ReservationMenu/ReservationListPage',
            [
                'booked_items' => $booked_items,
                'booked_rooms' => $booked_rooms
            ]
        );
    }
    // function for approve / reject item loan request
    public function ChangeItemStatus(Request $request)
    {
        try {
            DB::beginTransaction();
            $request->validate([
                'id' => 'required',
                'status' => 'required',
            ]);


            $booked_item = Booked_item::find($request->id);
            $booked_item->status = $request->status;
            $booked_item->save();
            DB::commit();

            return response()->json([
                'message' => 'status has been changed',
            ], 200);
        } catch (CustomException $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            return response()->json([
                'error' => $e->getMessage(),
            ], $e->getCode());
        }
    }

    // [Reservation/Item] Show Reservation Menu Related to Item
    public function showAdminReservationItemPage()
    {
        return Inertia::render(
            'Admin/Reservation/ReservationMenu/Submenu/Item/showAdminReservationItemPage'
        );
    }


    // [Reservation/Item/schedule] Show Item Schedule in time series
    public function ShowAdminReservationItemCurrentReservationPage()
    {
        return Inertia::render(
            'Admin/Reservation/ReservationMenu/Submenu/Item/ShowAdminReservationItemCurrentReservationPage'
        );
    }


    // [Reservation/Item/data] Show & Configure Reservation Data 
    public function showAdminReservationItemDataPage()
    {
        $item = Item::all();
        return Inertia::render(
            'Admin/Reservation/ReservationMenu/Submenu/Item/ShowAdminReservationItemDataPage',
            [
                'items' => $item
            ]
        );
    }

    // function for create new item
    public function createItem(Request $request)
    {
        try {

            DB::beginTransaction();
            $request->validate([
                'name' => 'required',
                'image' => 'required',
                'quantity' => 'required',
            ]);

            // declare variable for image
            $item = new Item();
            $image_title = null;
            $image_link = null;
            $image_item_id = Uuid::uuid4()->toString();

            // check image extension
            $extension = $request->file('image')->getClientOriginalExtension();
            if (!in_array($extension, ['jpg', 'png', 'jpeg'])) {
                throw ReservationException::Custom('Invalid image extension. Please upload a JPG or PNG image.');
            }

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $image_title = imgExtention($image);
                $image = Storage::putFileAs(
                    'public/images/items',
                    $request->file('image'),
                    $image_title
                );
                $image_link = $image;
            }

            $image = Item_image::create([
                'title' => $image_title,
                'link' => $image_link,
                'item_id' => $image_item_id,
            ]);

            $item->create([
                'id' => $image_item_id,
                'name' => $request->name,
                'quantity' => $request->quantity,
                'description' => $request->description,
            ]);

            DB::commit();

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Item has been created',
                ], 200);
            }
            return redirect()->back();
        } catch (CustomException $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            if ($request->wantsJson()) {
                return response()->json([
                    'error' => $e->getMessage(),
                ], $e->getCode());
            }
            return redirect()->back()->with('error', $e->getMessage());
        }
    }


    public function showAdminReservationHistoryPage()
    {
        $booked_items = Booked_item::with('user')->with('item')->where('status', '!=', 0)->get();
        $booked_rooms = Booked_room::with('user')->with('room')->where('status', '!=', 0)->get();
        return Inertia::render(
            'Admin/Reservation/ReservationMenu/showAdminReservationHistoryPage',
            [
                'booked_items' => $booked_items,
                'booked_rooms' => $booked_rooms
            ]
        );
    }
}
