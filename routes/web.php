<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/seat-booking', 'seat-booking')->name('seat.booking');

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('users', UserController::class)->names('users');
});

require __DIR__.'/settings.php';
