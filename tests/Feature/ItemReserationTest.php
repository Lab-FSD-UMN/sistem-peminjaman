<?php

namespace Tests\Feature;

use App\Http\Controllers\ReservationController;
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

class ItemReserationTest extends TestCase
{

    use RefreshDatabase;

    // public function testCreateNewItem()
    // {
    //     // Mock the UploadedFile instance
    //     $file = Mockery::mock(UploadedFile::class);
    //     $file->shouldReceive('getClientOriginalExtension')
    //         ->once()
    //         ->andReturn('jpg');
    //     $file->shouldReceive('getClientOriginalName')
    //         ->once()
    //         ->andReturn('avatar.jpg');
    //     $file->shouldReceive('getRealPath')  // Add this line
    //         ->once()
    //         ->andReturn('/tmp/avatar.jpg');

    //     // Mock the Request instance
    //     $request = Mockery::mock(Request::class);
    //     $request->shouldReceive('file')
    //         ->with('image')
    //         ->once()
    //         ->andReturn($file);
    //     $request->shouldReceive('validate');
    //     $request->shouldReceive('hasFile')
    //         ->with('image')
    //         ->once()
    //         ->andReturn(true);

    //     // Set other request data
    //     $request->name = 'item1';
    //     $request->quantity = 1;
    //     $request->is_available = true;
    //     $request->description = 'hello';

    //     // Membuat instance controller
    //     $controller = new ReservationController();

    //     // Memanggil metode createItem
    //     $response = $controller->createItem($request);

    //     // Memastikan respons berstatus 200
    //     $this->assertEquals(200, $response->getStatusCode());

    //     // Memastikan item tersimpan di database
    //     $this->assertDatabaseHas('items', [
    //         'name' => 'item1',
    //         'quantity' => 1,
    //         'is_available' => true,
    //         'description' => 'hello'
    //     ]);
    // }

    public function testSearchItemData()
    {
        // Membuat request palsu dengan parameter pencarian

        $request = new Request([
            'keyword' => 'item1',
            'per_page' => 5,
            'sort_by' => 'name'
        ]);

        // Membuat instance controller
        $controller = new ReservationController();

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

        print_r($items);
        // $this->assertStringContainsString("127", $items->path);
    }
}
