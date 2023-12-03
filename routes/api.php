<?php

use App\Http\Controllers\EmailController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\Reservation\RoomReservationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;
// use App\Http\Controllers\Reservation\RoomReservationController;
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

Route::prefix('room')->group(function () {
    // API FOR CRUD
    Route::get('/', [RoomController::class, 'showAllRoom']); //  create item
    Route::get('/{id}', [RoomController::class, 'showRoom']); //  create item
    Route::post('/create', [RoomController::class, 'createRoom']); //  create item
    Route::post('/update', [RoomController::class, 'updateRoom']); //
    Route::delete('/{id}/delete', [RoomController::class, 'deleteRoom']); //
    Route::post('/search', [RoomController::class, 'searchRoom']); //
});


Route::prefix('/reservation')->group(function () {
    Route::prefix('/room')->group(function () {
        Route::get('/', [RoomReservationController::class, 'showAllRoomReservationPending']); //    
        Route::get('/{id}', [RoomReservationController::class, 'showRoomReservationStatusOnGoingById']); //
        Route::get('/history', [RoomReservationController::class, 'showRoomReservationHistory']); //
        Route::get('/history/{id}', [RoomReservationController::class, 'showRoomReservationHistoryById']); //
        Route::post('/', [RoomReservationController::class, 'reserveRoom']);
        Route::post('/cancel', [RoomReservationController::class, 'cancelRoomReservation']);
        Route::post('/delete', [RoomReservationController::class, 'deleteRoomReservation']);
        Route::post('/update', [RoomReservationController::class, 'updateRoomReservation']);
        Route::post('/extend', [RoomReservationController::class, 'extendRoomReservation']);
    });
});

// Route::get('/reservation/{id}', [RoomReservationController::class, 'showUserReservationListAndStatus']); //


Route::post('/search/item', [ItemController::class, 'searchItemData']);

Route::post('/reservation/item', [ReservationController::class, 'reserveItem']);

// ADMIN
Route::post('/reservation/list/item/status', [ReservationController::class, 'ChangeItemReservationStatus']);
// api for adding new reservation item
Route::post('/admin/reservation/item', [ReservationController::class, 'addNewReservatioItem']);
// api for searcing history
Route::post('/search/history', [ItemController::class, 'searchHistoryData']);

// Reservation System Route End
// TESTING:
Route::post('/reservation/item/schedule', [ReservationController::class, 'showItemScheduleFromDate']);
