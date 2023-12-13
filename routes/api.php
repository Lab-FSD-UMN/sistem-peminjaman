<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomReservationController;
use App\Http\Controllers\ItemReservationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\Auth\APIAuthController;
use App\Http\Controllers\Reservation\RoomReservationController as ReservationRoomReservationController;
use App\Jobs\SendEmailJob;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('send-email', [EmailController::class, 'SendEmail'])->name('send.email');

// Reservation System Route Start [Edited by Ivan]
// USER

Route::prefix('auth')
    ->controller(APIAuthController::class)
    ->group(function () {

        Route::middleware(['auth:sanctum'])->group(function () {
            Route::post('/logout', 'logout');
        });

        Route::post('/login', 'login');
        Route::post('/register', 'register');
    });


// Admin protected API Routes
Route::middleware(['auth:sanctum', 'role-api:admin'])
    ->prefix('admin')
    ->group(function () {

        Route::prefix('event')
            ->controller(EventController::class)
            ->group(function () {
                Route::post('create', 'createEventPost');
                Route::post('update/{id}', 'updateEventPost');
                Route::delete('delete/{id}', 'deleteEventPost');
            });

        Route::prefix('item')
            ->controller(ItemController::class)
            ->group(function () {
                Route::post('/', 'createItem');

                Route::prefix('reservation')
                    ->controller(ItemReservationController::class)
                    ->group(function () {
                        Route::get('/find/{id}', 'adminGetReservationDetail');
                        Route::post('/list/status', 'ChangeItemReservationStatus');
                    });
            });

        Route::prefix('room')
            ->controller(RoomController::class)
            ->group(function () {
                Route::post('/', 'createRoom');

                Route::prefix('reservation')
                    ->controller(ReservationRoomReservationController::class)
                    ->group(function () {
                        Route::get('/find/{id}', 'adminGetReservationDetail');
                        Route::post('/list/status', 'changeRoomReservationStatus');
                    });
            });
    });

// User protected API Routes
Route::middleware(['auth:sanctum', 'role-api:user'])
    ->prefix('user')
    ->group(function () {

        Route::prefix('reservation')
            ->group(function () {

                Route::get('/request', [ReservationController::class, 'showUserReservationListAndStatusPage']); // get all item

                Route::prefix('item')
                    ->controller(ItemReservationController::class)
                    ->group(function () {
                        Route::post('/', 'reserveItem');

                        Route::get('/myreservations', 'viewAllSelfReservations');
                        Route::get('/myreservations/{id}', 'userGetReservationDetail');
                        Route::delete('/cancel/{id}', 'deleteReservation');
                    });


                Route::prefix('room')
                    ->controller(ReservationRoomReservationController::class)
                    ->group(function () {
                        Route::get('/myreservations', [RoomReservationController::class, 'showUserRoomReservationList']); //
                        Route::get('/myreservations/{id}', [ReservationRoomReservationController::class, 'showRoomReservationStatusOnGoingById']); //
                        Route::get('/history', [ReservationRoomReservationController::class, 'showRoomReservationHistory']); //
                        Route::get('/history/{id}', [ReservationRoomReservationController::class, 'showRoomReservationHistoryById']); //
                        Route::post('/', 'reserveRoom');
                        Route::delete('/cancel/{id}', 'cancelRoomReservation');
                        Route::post('/delete', [ReservationRoomReservationController::class, 'deleteRoomReservation']);
                        Route::post('/update', [ReservationRoomReservationController::class, 'updateRoomReservation']);
                        Route::post('/extend', [ReservationRoomReservationController::class, 'extendRoomReservation']);

                        // user
                        Route::prefix('/user')->group(function () {
                            Route::post('/', [ReservationRoomReservationController::class, 'userShowAllRoomReservationListandStatus']);
                        });
                    });
            });
    });



// Guest Routes
// -----------------------------------
Route::prefix('event')
    ->controller(EventController::class)
    ->group(function () {
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
    ->group(function () {
        Route::get('/', 'showAllRooms');
        Route::get('/{id}', 'getRoomById');
    });


Route::post('/search/history', [ReservationController::class, 'searchHistoryData']);
Route::prefix('room')->group(function () {
    // API FOR CRUD
    Route::get('/', [RoomController::class, 'showAllRoom']); //  create item
    Route::get('/{id}', [RoomController::class, 'showRoom']); //  create item
    Route::post('/create', [RoomController::class, 'createRoom']); //  create item
    Route::post('/update', [RoomController::class, 'updateRoom']); //
    Route::delete('/{id}/delete', [RoomController::class, 'deleteRoom']); //
    Route::post('/search', [RoomController::class, 'searchRoom']); //
});





Route::post('/search/item', [ItemController::class, 'searchItemData']);


// ADMIN

// api for adding new reservation item
// Route::post('/admin/reservation/item', [RoomReservationController::class, 'addNewReservatioItem']);
// api for searcing history


// Reservation System Route End
// Reservation System Route End
// TESTING:
Route::post('/reservation/item/schedule', [ReservationController::class, 'showItemScheduleFromDate']);
