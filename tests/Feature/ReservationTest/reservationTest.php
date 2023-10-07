<?php

namespace Tests\Feature;

use App\Http\Controllers\ItemController;
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

class ReservationTest extends TestCase
{

    use RefreshDatabase;

    public function test_showUserReservationPage()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/reservation');

        $response->assertStatus(200);
    }

    public function test_showUserReservationListAndStatusPage()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/reservation/myreservation');

        $response->assertStatus(200);
    }
}
