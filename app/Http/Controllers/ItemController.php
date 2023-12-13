<?php

namespace App\Http\Controllers;

use App\Exceptions\CustomException;
use App\Exceptions\ReservationException;
use App\Exceptions\ResponseException;
use App\Models\Item;
use App\Models\Item_image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class ItemController extends Controller
{

    public function showAllItemPage()
    {

        $items = Item::leftJoin('booked_items', 'booked_items.item_id', '=', 'items.id')
            ->select(
                'items.id AS id',
                'items.name AS name',
                'items.image AS image',
                'items.quantity AS quantity',
                'items.is_available AS is_available',
                'items.description AS description',
                'items.created_at AS created_at',
                'items.updated_at AS updated_at',
                DB::raw('items.quantity - COALESCE(SUM(CASE WHEN booked_items.status = 1 THEN booked_items.quantity ELSE 0 END), 0) as reserved_qty')
            )
            ->groupBy('items.id')
            ->get();

        return response()->json([
            'items' => $items
        ], 200);
    }

    public function getItemById($id)
    {
            $item = Item::find($id);

            if (!$item){
                throw new ResponseException(404, "Item is not found");
            }

            return response()->json([
                'message' => "Successfully fetched room detail.",
                'data' => $item
            ], 200);
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

            // check image extension, if other than listed extention, will throw error
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
        } catch (ReservationException $e) {
            // Handle exceptions (e.g., log the error)
            DB::rollBack(); // Rollback the transaction in case of an exception
            if ($request->wantsJson()) {
                return response()->json([
                    'error' => $e->getMessage(),
                ], $e->getCode());
            }
            if ($request->wantsJson()) {
                return response()->json([
                    'error' => $e->getMessage(),
                ], $e->getCode());
            }
            return redirect()->back()->with('error', $e->getMessage());
        }
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
}
