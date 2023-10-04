<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Booked_item;
use App\Models\Item;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;

class ItemReserationTest extends TestCase
{

    use RefreshDatabase;




    public function creatingItem()
    {
        
    }


    // public function testItemReservation()
    // {
    //     // Perform any necessary setup (e.g., create items, user, etc.)

    //     // Define request data
    //     $data = [
    //         'item_id' => 1,
    //         'quantity' => 2,
    //         'reservation_date_start' => '2023-09-28',
    //         'reservation_date_end' => '2023-09-29',
    //         'reservation_time_start' => '08:00:00',
    //         'reservation_time_end' => '10:00:00',
    //     ];

    //     // Make a POST request to the item reservation endpoint
    //     $response = $this->post('/reservation/item', $data);
    //     // Assertions
    //     $response->assertStatus(200); // Replace with the appropriate status code
    //     $this->assertDatabaseHas('booked_items', [
    //         // Ensure the data has been saved to the database correctly
    //         'item_id' => $data['item_id'],
    //         // Add more assertions as needed
    //     ]);
    // }
}
