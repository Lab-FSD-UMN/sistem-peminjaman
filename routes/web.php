<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomReservationController;
use App\Http\Controllers\ItemReservationController;
use App\Http\Controllers\Reservation\RoomReservationController as ReservationRoomReservationController;
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

Route::get('/facility', FacilityController::class)->name('facility');

Route::get('/about', AboutController::class)->name('about');

Route::get('/product', ProductController::class)->name('product');
Route::get('/product/{slug}', [ProductController::class, 'ProductDetail'])->name('product.detail');

Route::get('/gallery', GalleryController::class)->name('gallery');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::prefix('reservation')->group(function () {
    Route::get('/', [ReservationController::class, 'showUserReservationPage'])->name('reservation');

    Route::get('/myreservation', [ReservationController::class, 'showUserReservationListAndStatusPage'])->name('reservation.myreservation');


    Route::prefix('room')->group(function () {
        Route::get('/', [ReservationRoomReservationController::class, 'showRoomReservationPage'])->name('reservation.room');

        Route::get('/{id}', [ReservationRoomReservationController::class, 'showRoomReservationDetailPage']);
    });

    Route::prefix('item')->group(function () {  
        Route::get('/', [ItemReservationController::class, 'showItemReservationPage'])->name('reservation.item');
        Route::get('/{id}', [ItemReservationController::class, 'showItemReservationDetailPage']);
    });
});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::prefix('reservation')
        ->group(function () {
            Route::prefix('room')
                ->controller(ReservationRoomReservationController::class)
                ->group(function () {
                    Route::post('/', 'reserveRoom'); // create error bag
                    Route::get('/list', 'showAllRoomReservation');
                    Route::get('/find/{id}', 'userGetReservationDetail');
                    Route::post('/list/status', 'changeRoomReservationStatus');
                });

            Route::prefix('item')
                ->controller(ItemReservationController::class)
                ->group(function () {
                    Route::post('/', 'createItemReservation');
                    Route::get('/list', 'showAllItemReservation');
                    Route::get('/find/{id}', 'userGetReservationDetail');
                    Route::post('/list/status', 'ChangeItemReservationStatus');
                });
        });
});



Route::middleware(['auth', 'role:admin'])->group(function () {
    // [Reservation System START]
    // ADMIN
    Route::prefix('/admin')->name('admin.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('Admin/AdminPage');
        })->name('index');

        // Reservation System
        Route::prefix('/reservation')->name('reservation.')->group(function () {
            Route::get('/', [ReservationController::class, 'showAdminReservationDashboardPage'])->name('index');

            Route::get('/list', [ReservationController::class, 'showAdminReservationRequest'])->name('request');

            Route::get('/history', [ReservationController::class, 'showAdminReservationHistoryPage'])->name('history');


            Route::prefix('/item')->name('item.')->group(function () {
                Route::get('/', [ItemReservationController::class, 'showAdminReservationItemPage'])->name('index');

                Route::get('/schedule', [ItemReservationController::class, 'showAdminReservationItemMonitoringSchedule'])->name('schedule');

                Route::prefix('/data')->name('data.')->group(function () {
                    Route::get('/', [ItemReservationController::class, 'showAdminReservationItemDataPage'])->name('index');

                    // blm ada
                    Route::get('/{id}', [ItemReservationController::class, 'showAdminReservationItemDataDetailPage'])->name('show');

                    // blm ada
                    Route::post('/{id}', [ItemReservationController::class, 'createItemData'])->name('store');

                    // blm ada
                    Route::put('/{id}', [ItemReservationController::class, 'updateItemData'])->name('update');
                });
            });

            Route::prefix('/room')->name('room.')->group(function () {
                // Room : show room reservation page
                Route::get('/', [ReservationController::class, 'showAdminReservationRoomPage']); // haven't made. check controller
            });
        });

        //
    });

    Route::post('/item', [ItemController::class, 'createItem']); //  create item





    // [Reservation/] Show Room Menu page
    Route::get('/admin/reservation/room', [RoomReservationController::class, 'showAdminReservationSubMenuRoomPage']); //get



    // Room : show room reservation page
    Route::get('/admin/reservation/room', [RoomReservationController::class, 'showAdminReservationRoomPage']); // haven't made. check controller


    // Room data functon
    Route::prefix('/admin/reservation/room/data')->group(function () {
        // Display the room data page
        Route::get('/', [RoomReservationController::class, 'adminReservationRoomPage'])->name('admin.reservation.room.data.index');

        // Display room details (GET)
        Route::get('/{id}', [RoomReservationController::class, 'adminReservationRoomDetailPage'])->name('admin.reservation.room.data.show');


        // Create a new room (POST)
        Route::post('/{id}', [RoomReservationController::class, 'adminReservationRoomDetailPage'])->name('admin.reservation.room.data.store');


        // Update room details (PUT)
        Route::put('/{id}', [RoomReservationController::class, 'adminReservationRoomDetailPage'])->name('admin.reservation.room.data.update');


        // Delete a room (DELETE)
        Route::delete('/{id}', [RoomReservationController::class, 'adminReservationRoomDetailPage'])->name('admin.reservation.room.data.destroy');
    });

    // Room schedule function
    Route::get('/admin/reservation/room/schedule', [RoomReservationController::class, 'adminReservationRoomPage']);

    // Reservation System END
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
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    Route::post('admin/room/reservation/list/status', [ReservationRoomReservationController::class, 'changeRoomReservationStatus']);
});




// Fallback route
Route::fallback(function () {
    return Inertia::render('ErrorPage');
})->name('fallback');


require __DIR__ . '/auth.php';
