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

class ReservationController extends Controller
{
    public function showUserReservationPage()
    {
        // TODO: check if user is logged in middleware
        // if the user is not logged in, redirect to the login page
        if (auth()->user() == null) {
            return redirect()->route('login');
        }
        return Inertia::render('Reservation/showUserReservationPage');
    }

    public function showUserReservationListAndStatusPage()
    {
        // $Booked_item = Booked_item::where('user_id', auth()->user()->id)->with('item')->get();
        // Don't use auth()->user()->id, because it will return null if the user is not logged in
        $Booked_item = Booked_item::where('user_id', auth()->id())
            ->with('item')
            ->get();

        // Data to be sent to the view and JSON
        $data = [
            'userReservation' => $Booked_item,
        ];
        // Wants JSON
        if (request()->wantsJson()) {
            return response()->json($data, 200);
        }
        return Inertia::render('Reservation/ReservationGroup/MyReservation/showUserReservationListAndStatusPage', $data);
    }

    public function showAdminReservationDashboardPage()
    {
        return Inertia::render(
            'Admin/Reservation/showAdminReservationDashboardPage',
        );
    }

    // [Reservation/List] Show Update of User Reservation (GET)
    public function showAdminReservationRequest()
    {
        // get all booked items
        // $booked_items = Booked_item::with('user')->with('item')->get();
        $booked_items = Booked_item::with('user')->with('item')->where('status', 0)->get();
        // get all booked rooms
        $booked_rooms = Booked_room::with('user')->with('room')->get();
        return Inertia::render(
            'Admin/Reservation/ReservationMenu/showAdminReservationRequest',
            [
                'booked_items' => $booked_items,
                'booked_rooms' => $booked_rooms
            ]
        );
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

    public function searchHistoryData(Request $request)
    {
        $keyword = $request->input('keyword');
        $search_type = $request->input('search_type', 0); //0 for all, 1 for items only, 2 for rooms only
        $perPage = $request->input('per_page', 10);
        $sortBy = $request->input('sort_by', 'name');
        $sortDirection = $request->input('sort_direction', 'asc');
        $cacheKey = 'item_search_' . md5($keyword . $perPage . $sortBy . $sortDirection);

        // TODO: add logic to decide whether want to search for both, or spesific type
        return Cache::remember($cacheKey, 60, function () use ($keyword, $perPage, $sortBy, $sortDirection) {
            try {
                // TODO: add logic to decide whether want to search for both, or spesific type
                return Item::where('name', 'like', '%' . $keyword . '%')
                    ->with('item_images')
                    ->orderBy($sortBy, $sortDirection)
                    ->paginate($perPage);
            } catch (ReservationException $e) {
                return response()->json([
                    'error' => 'An error occurred while searching for items.',
                ], 500);
            }
        });
    }


}
