<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Rooms  = DB::table('rooms');

        #truncate table
        $Rooms->truncate();

        $Rooms->insert([
            'id' => '1',
            'name' => 'Room 1',
            'description' => 'Room 1',
            'is_available' => true,
        ]);
        $Rooms->insert([
            'id' => '2',
            'name' => 'Room 2',
            'description' => 'Room 2',
            'is_available' => true,
        ]);
    }
}
