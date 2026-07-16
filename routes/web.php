<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('users', UserController::class)->names('users');
});

Route::middleware(['auth', 'user'])->prefix('user')->group(function () {
    Route::inertia('/seat-booking', 'seat-booking')->name('seat.booking');
});

require __DIR__.'/settings.php';
