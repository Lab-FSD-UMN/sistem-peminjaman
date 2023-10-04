<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $booked_items = DB::table('booked_items');
        $booked_rooms = DB::table('booked_rooms');
        $items = DB::table('items');
        $rooms = DB::table('rooms');


        // truncate table
        $booked_items->truncate();
        $booked_rooms->truncate();
        $items->truncate();
        $rooms->truncate();

        // insert data
        $items_data = [
            [
                "id" => Uuid::uuid4()->toString(),
                "name" => "Kamera Canon",
                "description" => "Kamera Canon 5D Mark IV",
                "quantity" => 1,
            ],
            [
                "id" => Uuid::uuid4()->toString(),
                "name" => "Kamera Nikon",
                "description" => "Kamera Nikon D850",
                "quantity" => 2,
            ],
            [
                "id" => Uuid::uuid4()->toString(),
                "name" => "Kamera Sony",
                "description" => "Kamera Sony A7R IV",
                "quantity" => 3,
            ],
        ];

        $items->insert($items_data);
    }
}
