<?php

use App\Http\Controllers\AcceptEdit;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DownloadImageOriginal;
use App\Http\Controllers\FetchRequests;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\Galleries;
use App\Http\Controllers\GetPhotos;
use App\Http\Controllers\Home;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\Photographer;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePictures;
use App\Http\Controllers\RequestEdit;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UploadResult;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\User;
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

Route::delete('/logout',[AuthenticatedSessionController::class, 'destroy']);

Route::get('/homepage', [Home::class, 'getAllPhotos'])->name('home');

Route::prefix('/comments')->group(function () {
    Route::post('/store', [CommentController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{id}', [CommentController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [CommentController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::post('/add_like', [LikeController::class, 'store']);

Route::post('/upload', [UploadController::class, 'uploadPhoto'])->middleware('auth:sanctum');

Route::resource('/follows', FollowController::class)->middleware('auth:sanctum');

Route::get('/myprofile', [ProfileController::class, 'getInfos'])->middleware('auth:sanctum');

Route::post('/edit_profile', [ProfileController::class, 'editProfile'])->middleware('auth:sanctum');

Route::prefix('/edit_profile_pictures')->group(function () {
    Route::post('/avatar', [ProfilePictures::class, 'uploadAvatar'])->middleware('auth:sanctum');
    Route::post('/cover', [ProfilePictures::class, 'uploadCover'])->middleware('auth:sanctum');

    Route::delete('/delete_avatar', [ProfilePictures::class, 'deleteAvatar'])->middleware('auth:sanctum');
    Route::delete('/delete_cover', [ProfilePictures::class, 'deleteCover'])->middleware('auth:sanctum');
});

Route::get('/get_photos', [GetPhotos::class, 'getPhotos'])->middleware('auth:sanctum');

// Route::middleware('auth:sanctum')->group(function(){
// });

Route::get('/get_categories', function () {
    $categs = Category::all();
    return response()->json([
        'success' => true,
        'categories' => $categs
    ]);
});
Route::post('/create_gallery', [Galleries::class, 'AddGallery'])->middleware('auth:sanctum');

Route::get('/get_galleries', function(){
    $galleries = Gallery::where('user_id',Auth::id())->get();
    return response()->json([
        'success' => true,
        'galleries' => $galleries
    ]);
});

Route::get('/get_all_galleries',function(){
    $galleries = Gallery::all();
    return response()->json([
        'success' => true,
        'galleries' => $galleries
    ]);
});

Route::get('/get_users',function(){
    $users = User::all();
    return response()->json([
        'success' => true,
        'users' => $users
    ]);
});

Route::get('/get_gallery/{id}',[Galleries::class,'GetGallery'])->middleware('auth:sanctum');
Route::delete('/delete_gallery/{id}',[Galleries::class, 'DeleteGallery'])->middleware('auth:sanctum');

Route::get('/get_infos_photographers/{id}',[Photographer::class, 'getInformations']);

Route::post('/send_request',[RequestEdit::class,'requestEdit'])->middleware('auth:sanctum');

Route::get('/get_requests', [RequestEdit::class, 'getRequests'])->middleware('auth:sanctum');

Route::post('/change_status_req',[RequestEdit::class, 'changeStatusRequest'])->middleware('auth:sanctum');

Route::get('/get_requests_for_editors',[FetchRequests::class, 'getRequests'])->middleware('auth:sanctum');

Route::get('/get_my_requests',[FetchRequests::class, 'getMyRequests'])->middleware('auth:sanctum');

Route::post('/accept_req_edit',[AcceptEdit::class, 'accept'])->middleware('auth:sanctum');

Route::get('/download_photo/{photoId}',[DownloadImageOriginal::class, 'downloadImage'])->middleware('auth:sanctum');

Route::post('/upload_photo',[UploadResult::class, 'uploadResult'])->middleware('auth:sanctum');

require __DIR__ . '/auth.php';
