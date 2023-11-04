<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
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

Route::get('/about', AboutController::class)->name('about');

Route::get('/product', ProductController::class)->name('product');
Route::get('/product/{slug}', [ProductController::class, 'ProductDetail'])->name('product.detail');

Route::get('/gallery', GalleryController::class)->name('gallery');


// Reservation System Route Start
Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation.index');
Route::get('/admin/reservation', [ReservationController::class, 'admindashboard'])->name('admin.reservation.index');

Route::get('/reservation/myreservation', [ReservationController::class, 'myReservation'])->name('reservation.myreservation');

Route::get('/reservation/room', [ReservationController::class, 'room'])->name('reservation.room');
Route::get('/reservation/room/{id}', [ReservationController::class, 'roomDetail'])->name('reservation.room.detail');
Route::post('/reservation/room}', [ReservationController::class, 'roomDetail'])->name('reservation.reserve.room');

Route::get('/reservation/item', [ReservationController::class, 'item'])->name('reservation.item');
Route::get('/reservation/item/{id}', [ReservationController::class, 'itemDetail'])->name('reservation.item.detail');
Route::post('/reservation/item', [ReservationController::class, 'itemReserve']);

// Reservation System Route End 


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:admin'])->group(function () {
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
