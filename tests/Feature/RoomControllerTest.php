<?php

namespace Tests\Feature;

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RoomControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateRoom()
    {
        Storage::fake('public'); // Use the 'public' disk for testing
        
        $response = $this->json(
            'POST',
            '/api/room/create',
            [
                'name' => 'New Room',
                'description' => 'Room description',
                'image' => UploadedFile::fake()->image('test.jpg'), // Simulate image upload
            ]
        );

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'code',
            'data' => [
                'room' => [
                    'id',
                    'name',
                    'description',
                    'image',
                    'created_at',
                    'updated_at',
                ],
            ],
            'message',
        ]);

        $this->assertDatabaseHas('rooms', [
            'name' => 'New Room',
            'description' => 'Room description',
        ]);
    }

    public function testCreateRoomValidationFailure()
    {
        // Test the case when validation fails (e.g., missing 'name' field)
        $response = $this->json('POST', '/api/room/create', []);
        $response->assertStatus(422);
    }

    public function testCreateRoomImageUploadFailure()
    {
        // Test the case when image upload fails
        $response = $this->json('POST', '/api/room/create', [
            'name' => 'New Room',
            'description' => 'Room description',
            'image' => UploadedFile::fake()->create('test.pdf'), // Simulate image upload
        ]);
        $response->assertStatus(422);
    }

    //get all room
    public function testShowAllRoom()
    {
        $response = $this->json('GET', '/api/room/');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'code',
            'data' => [
                'rooms' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'image',
                        'created_at',
                        'updated_at',
                    ],
                ],
            ],
            'message',
        ]);
    }

    public function testShowRoomById()
    {
        // Create a room in the database
        $room = Room::create([
            'name' => 'New Room',
            'description' => 'Room description',
            'image' => 'path/to/your/image.jpg', // You can specify an image path here
        ]);

        // Simulate a GET request to retrieve the room by its ID
        $response = $this->json('GET', '/api/room/' . $room->id);

        // Assertions
        $response->assertStatus(200);
        //log the response
        // $response->dump(); // Uncomment this line to dump the response
        $response->assertJsonStructure([
            'code',
            'data' => [
                'room' => [
                    'id',
                    'name',
                    'description',
                    'image',
                    'created_at',
                    'updated_at',
                ],
            ],
            'message',
        ]);
    }

    //search room
    public function testSearchRoom()
    {
        $response = $this->json('POST', '/api/room/search', [
            'keyword' => 'New Room',
            'per_page' => '10',
            'sort_by' => 'name',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'code',
            'data' => [
                'rooms' => [
                    '*' => [
                        'id',
                        'name',
                        'description',
                        'image',
                        'created_at',
                        'updated_at',
                    ],
                ],
            ],
            'message',
        ]);
    }

    public function tearDown(): void
    {
        // Clean up the database after the test
        Room::query()->delete();
        parent::tearDown();
    }
}
