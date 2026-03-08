<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Home;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/user',function(){
    return response()->json(['success' => true,'user' => Auth::user()]);
});

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::get('/homepage', [Home::class, 'getAllPhotos'])->name('home');

require __DIR__.'/auth.php';
