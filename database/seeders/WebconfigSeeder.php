<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebconfigSeeder extends Seeder
{

    public function run(): void
    {
        $webconfig = DB::table('webconfigs');
        $webconfig->truncate(); //clear all data from table

        $data = [
            // General 
            [
                'category' => 'general',
                'title' => 'company_name',
                'alias' => 'Nama Perusahaan',
                'type' => 'text',
                'value' => 'Renara',
            ],
            [
                'category' => 'general',
                'title' => 'company_description',
                'alias' => 'Deskripsi Perusahaan',
                'type' => 'textarea',
                'value' => 'Ini adalah deskripsi perusahaan. edit untuk mengubahnya di halaman admin',
            ],
            [
                'category' => 'general',
                'title' => 'company_address',
                'alias' => 'Alamat Perusahaan',
                'type' => 'text',
                'value' => 'Jl. Raya Ciputat Parung No. 1, Ciputat, Tangerang Selatan, Banten',
            ],
            [
                'category' => 'general',
                'title' => 'company_history',
                'alias' => 'Sejarah Perusahaan',
                'type' => 'textarea',
                'value' => 'Renara adalah agency yang bergerak di bidang penyedia layananan digital',
            ],
            [
                'category' => 'general',
                'title' => 'company_date_established',
                'alias' => 'Tanggal Perusahaan Berdiri',
                'type' => 'text',
                'value' => '01 Januari 2021',
            ],
            [
                'category' => 'general',
                'title' => 'company_vision',
                'alias' => 'Visi Perusahaan',
                'type' => 'text',
                'value' => 'Menjadi perusahaan yang terpercaya dan terbaik di bidangnya',
            ],
            [
                'category' => 'general',
                'title' => 'company_mission',
                'alias' => 'Misi Perusahaan',
                'type' => 'text',
                'value' => 'Membangun kepercayaan pelanggan dengan memberikan pelayanan terbaik',
            ],
            [
                'category' => 'general',
                'title' => 'company_logo',
                'alias' => 'Logo Perusahaan',
                'type' => 'image',
                'value' => 'logo.svg',
            ],
            // Home
            [
                'category' => 'home',
                'title' => 'home_bg',
                'alias' => 'hero_bg_img',
                'type' => 'image',
                'value' => 'logo.svg',
            ],
            [
                'category' => 'home',
                'title' => 'hero_title',
                'alias' => 'Judul Hero',
                'type' => 'text',
                'value' => 'Art and Design Faculty Laboratorium',
            ],
            [
                'category' => 'home',
                'title' => 'hero_subtitle',
                'alias' => 'Sub Judul Hero',
                'type' => 'text',
                'value' => 'Experience the Future',
            ],
            [
                'category' => 'home',
                'title' => 'hero_description',
                'alias' => 'Deskripsi Hero',
                'type' => 'text',
                'value' => 'Deskripsi untuk Art and Design Faculty Laboratorium',
            ],
            [
                'category' => 'home',
                'title' => 'photo_labHead',
                'alias' => 'Photo Lab Head',
                'type' => 'image',
                'value' => '/public/assets/logoFSD.png',
            ],
            [
                'category' => 'home',
                'title' => 'name_labHead',
                'alias' => 'Name Lab Head',
                'type' => 'text',
                'value' => 'Hendie Daffa Silvia',
            ],
            [
                'category' => 'home',
                'title' => 'position_labHead',
                'alias' => 'Position Lab Head',
                'type' => 'text',
                'value' => 'Lab Head Coordinator',
            ],
            [
                'category' => 'home',
                'title' => 'section1_title',
                'alias' => 'Judul Section 1',
                'type' => 'text',
                'value' => 'What We Do?',
            ],
            [
                'category' => 'home',
                'title' => 'section1_description',
                'alias' => 'Deskripsi Section 1',
                'type' => 'text',
                'value' => 'Deskripsi untuk Section 1',
            ],
            [
                'category' => 'home',
                'title' => 'section2_title',
                'alias' => 'Judul Section 2',
                'type' => 'text',
                'value' => 'FSD Lab in Numbers',
            ],
            [
                'category' => 'home',
                'title' => 'section2_description',
                'alias' => 'Deskripsi Section 2',
                'type' => 'text',
                'value' => 'Deskripsi untuk Section 2',
            ],
            [
                'category' => 'home',
                'title' => 'section3_title',
                'alias' => 'Judul Section 3',
                'type' => 'text',
                'value' => 'How To Reserve?',
            ],
            [
                'category' => 'home',
                'title' => 'section3_description',
                'alias' => 'Deskripsi Section 3',
                'type' => 'text',
                'value' => 'Deskripsi untuk Section 3',
            ],
            [
                'category' => 'home',
                'title' => 'labRules_desc',
                'alias' => 'Lab Rules Desc',
                'type' => 'text',
                'value' => 'Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua.',
            ],
            [
                'category' => 'home',
                'title' => 'reservationFlow_desc',
                'alias' => 'Reservation Flow Desc',
                'type' => 'text',
                'value' => 'Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua.',
            ],
            [
                'category' => 'home',
                'title' => 'reserveNow_desc',
                'alias' => 'Reserve Now Desc',
                'type' => 'text',
                'value' => 'Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua.',
            ],
            // Contact
            [
                'category' => 'contact',
                'title' => 'company_call_number',
                'alias' => 'Nomor Telepon Perusahaan',
                'type' => 'text',
                'value' => '(021) 740 6044',
            ],
            [
                'category' => 'contact',
                'title' => 'company_email',
                'alias' => 'Alamat Email Perusahaan',
                'type' => 'text',
                'value' => 'company@gmail.com',
            ],
            [
                'category' => 'contact',
                'title' => 'company_facebook',
                'alias' => 'Link Facebook Perusahaan',
                'type' => 'text',
                'value' => 'facebook.com/company',
            ],
            [
                'category' => 'contact',
                'title' => 'company_instagram',
                'alias' => 'Link Instagram Perusahaan',
                'type' => 'text',
                'value' => 'instagram.company',
            ],
            [
                'category' => 'contact',
                'title' => 'company_linkedin',
                'alias' => 'Link Linkedin Perusahaan',
                'type' => 'text',
                'value' => 'linkedin.company',
            ],

        ];

        $webconfig->insert($data); //insert batch data to database table (webconfigs)
        // php artisan migrate:fresh --seed --seeder=WebconfigSeeder
    }
}