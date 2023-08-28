<?php

use App\Http\Controllers\EmailController;
use App\Jobs\SendEmailJob;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('send-email', [EmailController::class, 'SendEmail'])->name('send.email');

// Route::post('send-email', function (Request $request) {
//     dd($request);
//         // $data = $request->all();
//     // $data['email'] = 'aureliusivanwijaya@gmail.com';
//     // // antrian email
//     // dispatch(new SendEmailJob($data));
//     // return 'Email was sent';
// });