<?php

use App\Http\Controllers\Admin\CountryController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\StateController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('users', UserController::class)->names('users');

    Route::resource('languages', LanguageController::class)->names('languages');

    Route::resource('countries', CountryController::class)->names('countries');
    Route::patch('countries/{country}/toggle-status', [CountryController::class, 'toggleStatus'])->name('countries.toggle-status');

    Route::resource('states', StateController::class)->names('states');
    Route::patch('states/{state}/toggle-status', [StateController::class, 'toggleStatus'])->name('states.toggle-status');
});

Route::middleware(['auth', 'user'])->prefix('user')->group(function () {
    Route::inertia('/seat-booking', 'seat-booking')->name('seat.booking');
});

require __DIR__.'/settings.php';
