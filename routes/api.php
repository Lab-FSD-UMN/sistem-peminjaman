<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomReservationController;
use App\Http\Controllers\ItemReservationController;
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
    ->prefix('admin')
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
                Route::post('/', 'createItem');

                Route::prefix('reservation')
                    ->controller(ItemReservationController::class)
                    ->group(function(){
                        Route::get('/find/{id}', 'adminGetReservationDetail');
                        Route::post('/list/status', 'ChangeItemReservationStatus');
                    });
            });

});

// User protected API Routes
Route::middleware(['auth:sanctum', 'role-api:user'])
    ->prefix('user')
    ->group(function(){

        Route::prefix('reservation')
            ->group(function(){

                Route::get('/request', [ReservationController::class, 'showUserReservationListAndStatusPage']); // get all item

                Route::prefix('item')
                    ->controller(ItemReservationController::class)
                    ->group(function(){
                        Route::post('/', 'reserveItem');

                        Route::get('/myreservations', 'viewAllSelfReservations');
                        Route::get('/myreservations/{id}', 'userGetReservationDetail');
                        Route::delete('/cancel/{id}', 'deleteReservation');
                    });



                Route::prefix('room')
                    ->controller(RoomReservationController::class)
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



// Item route
Route::prefix('item')
    ->controller(ItemController::class)
    ->group(function () {
        Route::get('/', 'showAllItemPage'); //  create item
        Route::get('/{id}', 'getItemById');
        Route::post('/search', 'searchItemData');
});

// Room Route
Route::prefix('room')
    ->controller(RoomController::class)
    ->group(function(){
        Route::get('/', 'showAllRooms');
        Route::get('/{id}', 'getRoomById');
    });


Route::post('/search/history', [ReservationController::class, 'searchHistoryData']);


// ADMIN

// api for adding new reservation item
// Route::post('/admin/reservation/item', [RoomReservationController::class, 'addNewReservatioItem']);
// api for searcing history


// Reservation System Route End
