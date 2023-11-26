<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestimonySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonies = DB::table('testimonies');
        $testimonies->truncate(); //clear all data from table

        $testimonies->insert([
            [
                'name' => 'John Doe',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'name' => 'John Uhuy',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'Rudy',
                'position' => 'Customer',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'name' => 'John Lamo',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'John Doe',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'name' => 'John Uhuy',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'Rudy',
                'position' => 'Customer',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'name' => 'John Lamo',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'John Doe',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'name' => 'John Uhuy',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'name' => 'Rudy',
                'position' => 'Customer',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'name' => 'John Lamo',
                'position' => 'CEO',
                'testimony' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
        ]);
    }
}