<?php

use App\Http\Controllers\FaqController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoanApplicationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - main functionality
Route::get('/', [HomeController::class, 'index'])->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Wallet routes
    Route::controller(WalletController::class)->prefix('wallet')->group(function () {
        Route::get('/', 'index')->name('wallet.index');
        Route::post('/withdraw', 'store')->name('wallet.withdraw');
    });

    // FAQ routes
    Route::get('/faq', [FaqController::class, 'index'])->name('faq.index');

    // Profile routes
    Route::controller(ProfileController::class)->prefix('profile')->group(function () {
        Route::get('/', 'index')->name('profile.index');
        Route::get('/verify', 'edit')->name('profile.verify');
        Route::post('/', 'store')->name('profile.store');
        Route::patch('/', 'update')->name('profile.update');
    });

    // Loan application routes
    Route::post('/loan-application', [LoanApplicationController::class, 'store'])->name('loan.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';