<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\WebconfigController;
use App\Models\Image;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// general user
// Route::get('/', function () {
//     return Inertia::render('', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/', HomeController::class)->name('home');
Route::get('/testing', function () {
    return Inertia::render('Testing/TestingPage');
})->name('testing');
Route::get('/contact', ContactController::class)->name('contact');

Route::get('/product', ProductController::class)->name('product');
Route::get('/product/{slug}', [ProductController::class, 'ProductDetail'])->name('product.detail');

Route::get('/gallery', GalleryController::class)->name('gallery');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware([
//     'auth', 'role:admin, user',
// ])->group(function () {
// User Reservation System Route Start
// [Reservation/] Show Reservation Dashboard Page for user (GET)
Route::get('/reservation', [ReservationController::class, 'showUserReservationPage'])->name('reservation');
// [Reservation/Myreservation] Show all item and room reservation of user (GET)
Route::get('/reservation/myreservation', [ReservationController::class, 'showUserReservationListAndStatusPage'])->name('reservation.myreservation');

// [Reservation/Room] Show All Room for reservation (GET)
Route::get('/reservation/room', [ReservationController::class, 'showRoomReservationPage'])->name('reservation.room');
// [Reservation/Room/{id}] Show Room Reservation Detail Page (GET)
Route::get('/reservation/room/{id}', [ReservationController::class, 'showRoomReservationDetailPage']);

// [Reservation/Item] Show All Item for reservation (GET)
Route::get('/reservation/item', [ReservationController::class, 'showItemReservationPage'])->name('reservation.item');
// [Reservation/Item/{id}] Show Item Reservation Detail Page (GET)
Route::get('/reservation/item/{id}', [ReservationController::class, 'showItemReservationDetailPage']);
// Reservation System Route End 
// });



Route::middleware(['auth', 'role:admin'])->group(function () {
    // [Reservation System START]
    // [Reservation/] Show Admin Reservation Dashboard Page (GET)
    Route::get('/admin/reservation', [ReservationController::class, 'showAdminReservationDashboardPage'])->name('admin.reservation.index');

    // [Reservation/List] Show Update of User Reservation (GET)
    Route::get('/admin/reservation/list', [ReservationController::class, 'showAdminReservationRequest'])->name('admin.reservation.request');

    // [Reservation/History] Show History of User Reservation (GET)
    Route::get('/admin/reservation/history', [ReservationController::class, 'showAdminReservationHistoryPage'])->name('admin.reservation.history');

    // [Reservation/Item] Show Reservation Menu Related to Item
    Route::get('/admin/reservation/item', [
        ReservationController::class,
        'showAdminReservationItemPage'
    ]); //get

    Route::post('/item', [ItemController::class, 'createItem']); //  create item

    // [Reservation/Item/schedule] Show Item Schedule in time series
    Route::get('/admin/reservation/item/schedule', [ReservationController::class, 'showAdminReservationItemMonitoringSchedule']); //get

    // [Reservation/Item/data] Show & Configure Reservation Data 
    Route::prefix('/admin/reservation/item/data')->group(function () {
        // Display the item data page
        Route::get('/', [ReservationController::class, 'showAdminReservationItemDataPage'])->name('admin.reservation.item.data.index');

        // Display item details (GET)
        Route::get('/{id}', [ReservationController::class, 'showAdminReservationItemDataDetailPage'])->name('admin.reservation.item.data.show');

        // Create a new item (POST)
        Route::post('/{id}', [ReservationController::class, 'creataItemData'])->name('admin.reservation.item.data.store');

        // Update item details (PUT)
        Route::put('/{id}', [ReservationController::class, 'updateItemData'])->name('admin.reservation.item.data.update');

        // Delete an item (DELETE)
        Route::delete('/{id}', [ReservationController::class, 'deleteItemData'])->name('admin.reservation.item.data.destroy');
    });



    // [Reservation/] Show Room Menu page
    Route::get('/admin/reservation/room', [ReservationController::class, 'showAdminReservationSubMenuRoomPage']); //get


    // Room : show room reservation page
    Route::get('/admin/reservation/room', [ReservationController::class, 'showAdminReservationRoomPage']); // haven't made. check controller

    // Room data functon
    Route::prefix('/admin/reservation/room/data')->group(function () {
        // Display the room data page
        Route::get('/', [ReservationController::class, 'adminReservationRoomPage'])->name('admin.reservation.room.data.index');

        // Display room details (GET)
        Route::get('/{id}', [ReservationController::class, 'adminReservationRoomDetailPage'])->name('admin.reservation.room.data.show');

        // Create a new room (POST)
        Route::post('/{id}', [ReservationController::class, 'adminReservationRoomDetailPage'])->name('admin.reservation.room.data.store');

        // Update room details (PUT)
        Route::put('/{id}', [ReservationController::class, 'adminReservationRoomDetailPage'])->name('admin.reservation.room.data.update');

        // Delete a room (DELETE)
        Route::delete('/{id}', [ReservationController::class, 'adminReservationRoomDetailPage'])->name('admin.reservation.room.data.destroy');
    });

    // Room schedule function
    Route::get('/admin/reservation/room/schedule', [ReservationController::class, 'adminReservationRoomPage']);

    // Reservation System END

    Route::get('/admin', function () {
        return Inertia::render('Admin/AdminPage');
    })->name('admin');
    Route::get('/admin/webconfig', WebconfigController::class)->name('admin.webconfig');
    Route::post('/admin/webconfig', [WebconfigController::class, 'UpdateWebconfig'])->name('admin.webconfig.update');

    // PRODUCT
    Route::get('/admin/product', [ProductController::class, 'AdminPage'])->name('admin.product');
    Route::post('/admin/product/{id}', [ProductController::class, 'UpdateProduct'])->name('admin.product.update');
    Route::delete('/admin/product/{id}', [ProductController::class, 'DeleteProduct'])->name('admin.product.delete');
    Route::post('/admin/product', [ProductController::class, 'AddProduct'])->name('admin.product.add');

    // GALLERY
    Route::get('/admin/gallery', [GalleryController::class, 'AdminPage'])->name('admin.gallery');

    // PROFILE
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




// Fallback route
Route::fallback(function () {
    return Inertia::render('ErrorPage');
})->name('fallback');


require __DIR__ . '/auth.php';
