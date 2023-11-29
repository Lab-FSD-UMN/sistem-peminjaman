<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facilities = DB::table('facilities');
        $facilities->truncate(); //clear all data from table

        $facilities->insert([
            [
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'Rudy',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'name' => 'John Lamo',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'John Doe',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'name' => 'John Uhuy',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'Rudy',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'name' => 'John Lamo',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'John Doe',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'John Uhuy',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'Rudy',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'name' => 'John Lamo',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
        ]);
    }
}