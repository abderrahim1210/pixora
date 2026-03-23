<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\GetPhotos;
use App\Http\Controllers\Home;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePictures;
use App\Http\Controllers\UploadController;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/user', function () {
    return response()->json(['success' => true, 'user' => Auth::user()]);
});

Route::get('/photo/{id}', [PhotoController::class, 'show'])->name('photo');
Route::post('/photo/{id}', [PhotoController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/photo/{id}', [PhotoController::class, 'destroy'])->middleware('auth:sanctum');

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::get('/homepage', [Home::class, 'getAllPhotos'])->name('home');

Route::prefix('/comments')->group(function () {
    Route::post('/store', [CommentController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{id}', [CommentController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [CommentController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::post('/add_like', [LikeController::class, 'store']);

Route::post('/upload', [UploadController::class, 'uploadPhoto'])->middleware('auth:sanctum');

Route::resource('/follows', FollowController::class);

Route::get('/myprofile', [ProfileController::class, 'getInfos'])->middleware('auth:sanctum');

Route::post('/edit_profile', [ProfileController::class, 'editProfile'])->middleware('auth:sanctum');

Route::prefix('/edit_profile_pictures')->group(function(){
    Route::post('/avatar',[ProfilePictures::class, 'uploadAvatar'])->middleware('auth:sanctum');
    Route::post('/cover',[ProfilePictures::class, 'uploadCover'])->middleware('auth:sanctum');

    Route::delete('/delete_avatar',[ProfilePictures::class, 'deleteAvatar'])->middleware('auth:sanctum');
    Route::delete('/delete_cover',[ProfilePictures::class, 'deleteCover'])->middleware('auth:sanctum');
});

Route::get('/get_photos',[GetPhotos::class, 'getPhotos'])->middleware('auth:sanctum');

Route::get('/get_categories', function () {
    $categs = Category::all();
    return response()->json([
        'success' => true,
        'categories' => $categs
    ]);
});

require __DIR__ . '/auth.php';
