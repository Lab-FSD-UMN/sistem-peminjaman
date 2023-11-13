<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\EventController;
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

// Admin protected API Routes
Route::middleware(['auth:sanctum', 'role-api:admin'])
    ->group(function(){

        Route::prefix('event')
            ->controller(EventController::class)
            ->group(function(){
                Route::post('create', 'createEventPost');
                Route::post('update/{id}', 'updateEventPost');
                Route::delete('delete/{id}', 'deleteEventPost');
            });

        Route::prefix('item')
            ->controller(ItemController::class)
            ->group(function(){
                Route::post('/', [ItemController::class, 'createItem']);
            });

});

// User protected API Routes
Route::middleware(['auth:sanctum', 'role-api:user'])
    ->group(function(){

        Route::prefix('reservation')
            ->controller(ReservationController::class)
            ->group(function(){

                Route::get('/list/item/status', 'ChangeItemReservationStatus');

                Route::prefix('item')
                    ->group(function(){
                        Route::post('/', 'reserveItem');
                    });

                Route::prefix('room')
                    ->group(function(){
                        Route::post('/', 'roomReserve'); // haven't exist
                    });

            });

});



// Guest Routes
// -----------------------------------
Route::prefix('event')
    ->controller(EventController::class)
    ->group(function(){
        Route::get('/', 'getAllEventPosts');
        Route::get('/id/{id}', 'getSpecificEventPost');
});

// API for create new Item
Route::get('/request', [ReservationController::class, 'showUserReservationListAndStatusPage']); // get all item

// Item route
Route::prefix('item')
    ->controller(ItemController::class)
    ->group(function () {
        Route::get('/', 'showAllItemPage'); //  create item
        Route::post('/search', 'searchItemData');
});



// ADMIN

// api for adding new reservation item
Route::post('/admin/reservation/item', [ReservationController::class, 'addNewReservatioItem']);
// api for searcing history
Route::post('/search/history', [ItemController::class, 'searchHistoryData']);

// Reservation System Route End
