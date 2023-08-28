<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class HomePageTest extends TestCase
{   
    public function test_apps_content()
    {
        // $response = $this->get('/')->assertInertia(
        //     fn (Assert $page) => $page
        //         ->has('Footer')
        // );

        $response = $this->get('/');
        // $response->assertStatus(200);
        $response->assertStatus(200);
    }
}