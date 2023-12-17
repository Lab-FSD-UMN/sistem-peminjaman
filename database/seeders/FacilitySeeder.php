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
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Melawai',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Teater',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Melawai',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Teater',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Melawai',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Teater',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Melawai',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Teater',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Melawai',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'FN621',
                'name' => 'Rasyid',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/bonjovi.jpg'),
            ],
            [
                'kode' => 'CG287',
                'name' => 'Aulia',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/umn background.png'),
            ],
            [
                'kode' => 'CA114',
                'name' => 'Teater',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget',
                'image' => asset('/assets/hutan.jpg'),
            ],
        ]);
    }
}