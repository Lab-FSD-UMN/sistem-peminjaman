<?php

namespace Tests\Feature;

use App\Http\Controllers\ItemController;
use App\Http\Controllers\RoomReservationController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Booked_item;
use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Mockery;
use Mockery\Mock;

class ItemReservationTest extends TestCase
{

    use RefreshDatabase;

    public function test_SearchItemData()
    {
        // Membuat request palsu dengan parameter pencarian

        $request = new Request([
            'keyword' => 'item1',
            'per_page' => 5,
            'sort_by' => 'name'
        ]);

        // Membuat instance controller
        $controller = new ItemController();

        // Memanggil metode searchItemData
        $response = $controller->searchItemData($request);

        // Memastikan respons berstatus 200
        $this->assertEquals(200, $response->getStatusCode());

        // Mendapatkan data item dari respons
        $items = json_decode($response->getContent())->items;

        // Memastikan data item tidak kosong
        $this->assertNotEmpty($items);

        // Memeriksa apakah setiap item memiliki nama yang mengandung kata kunci
        foreach ($items->data as $item) {
            $this->assertStringContainsString("hello", $item->name);
            $this->assertArrayHasKey('id', $item);
        }


    }
}
