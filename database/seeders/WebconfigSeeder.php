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