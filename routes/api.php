<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Auth\APIAuthController;
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

// Reservation System Route Start [Edited by Ivan]
// USER

Route::prefix('auth')
    ->controller(APIAuthController::class)
    ->group(function(){

        Route::middleware(['auth:sanctum'])->group(function(){
            Route::post('/logout', 'logout');
        });

        Route::post('/login', 'login');
        Route::post('/register', 'register');
});



// API for create new Item
Route::get('/request', [ReservationController::class, 'showUserReservationListAndStatusPage']); // get all item

// item route
Route::prefix('item')->group(function () {
    Route::get('/', [ItemController::class, 'showAllItemPage']); //  create item
    Route::post('/', [ItemController::class, 'createItem']); //  create item
    Route::put('/', [ReservationController::class, 'roomReserve']);
    Route::delete('/', [ReservationController::class, 'roomReserve']);
    // API for search item
});

Route::post('/search/item', [ItemController::class, 'searchItemData']);

Route::post('/room', [ReservationController::class, 'roomReserve']);

Route::post('/reservation/item', [ReservationController::class, 'reserveItem']);

// ADMIN
Route::post('/reservation/list/item/status', [ReservationController::class, 'ChangeItemReservationStatus']);
// api for adding new reservation item
Route::post('/admin/reservation/item', [ReservationController::class, 'addNewReservatioItem']);
// api for searcing history
Route::post('/search/history', [ItemController::class, 'searchHistoryData']);

// Reservation System Route End
