http://127.0.0.1:8000<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Home;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PhotoController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/user',function(){
    return response()->json(['success' => true,'user' => Auth::user()]);
});

Route::get('/photo/{id}',[PhotoController::class,'show'])->name('photo');

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::get('/homepage', [Home::class, 'getAllPhotos'])->name('home');

Route::prefix('/comments')->group(function(){
    Route::post('/store',[CommentController::class,'store']);
});

Route::post('/add_like',[LikeController::class,'store']);

require __DIR__.'/auth.php';
