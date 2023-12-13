<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $User = DB::table('users');
        if (
            $User->where('email', 'admin')->doesntExist()
        ) {
            $User->insert([
                "id" => '1',
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('dadargulung'),
                'role' => 1
            ]);
            $User->insert([
                "id" => 2,
                'name' => 'user',
                'email' => 'user@user.com',
                'password' =>  Hash::make('dadargulung'),
                'role' => 0
            ]);
            $User->insert([
                "id" => Uuid::uuid4()->toString(),
                'name' => 'ujang',
                'email' => 'ujang@user.com',
                'password' =>  Hash::make('dadargulung'),
                'role' => 0
            ]);
        }
    }
}
