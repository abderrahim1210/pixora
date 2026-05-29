<?php

use App\Http\Controllers\AcceptEdit;
use App\Http\Controllers\AddFollow;
use App\Http\Controllers\AdminAnalytics;
use App\Http\Controllers\AdminUsersActions;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\DeleteAccount;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DownloadImageOriginal;
use App\Http\Controllers\ExplorePhotos;
use App\Http\Controllers\FetchRequests;
use App\Http\Controllers\FetchUsers;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\Galleries;
use App\Http\Controllers\GetFollowsListe;
use App\Http\Controllers\GetHeroImages;
use App\Http\Controllers\GetPhotos;
use App\Http\Controllers\Home;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MakeFeaturedPhoto;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\Photographer;
use App\Http\Controllers\PhotosLikeOriginal;
use App\Http\Controllers\ProfileAnalytics;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePictures;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\RequestEdit;
use App\Http\Controllers\RequestsController;
use App\Http\Controllers\ResetPassword;
use App\Http\Controllers\SearchAtPhotos;
use App\Http\Controllers\SendReport;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\UpdateSensitiveData;
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
    $user = Auth::user();
    if (!$user) {
        return response()->json(['success' => false], 401);
    }
    return response()->json(['success' => true, 'user' => [
        'id' => $user->id,
        'email' => $user->email,
        'username' => $user->username,
        'photo_profile' => $user->photo_profile,
        'role' => $user->role,
        'status' => $user->status
    ]]);
});

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::delete('/logout', [AuthenticatedSessionController::class, 'destroy']);

Route::get('/homepage', [Home::class, 'getAllPhotos'])->name('home');

Route::post('/add_like', [LikeController::class, 'store']);


Route::get('/get_categories', function () {
    $categs = Category::select('id', 'name')->get();
    return response()->json([
        'success' => true,
        'categories' => $categs
    ]);
});


Route::get('/get_galleries', function () {
    $galleries = Gallery::select('id', 'title', 'description')->with(['photos:id,filename', 'user:id,username'])->where('user_id', Auth::id())->get();
    return response()->json([
        'success' => true,
        'galleries' => $galleries
    ]);
});

Route::get('/get_all_galleries', function () {
    $galleries = Gallery::with(['photos:id,filename', 'user:id,username'])->select('id', 'title', 'description', 'user_id')->get();
    return response()->json([
        'success' => true,
        'galleries' => $galleries
    ]);
});

Route::get('/get_users/{type}', [FetchUsers::class, 'getUsers']);

Route::get('/get_gallery/{id}', [Galleries::class, 'GetGallery']);


Route::get('/get_infos_photographers/{id}', [Photographer::class, 'getInformations']);

Route::get('/search', [SearchAtPhotos::class, 'getResult']);

Route::get('/get_hero_images', [GetHeroImages::class, 'getHeroImages']);



Route::post('/send_link_email', [ForgotPasswordController::class, 'sendLinkEmail']);

Route::post('/reset_password', [NewPasswordController::class, 'store']);

Route::get('/photo/{id}', [PhotoController::class, 'show'])->name('photo');

Route::get('/photos_like_original',[PhotosLikeOriginal::class, 'GetPhotos']);

Route::get('/get_follows_liste',[GetFollowsListe::class, 'getFollows']);

Route::middleware('auth:sanctum', 'CheckUserStatus')->group(function () {
    Route::post('/remove_role', [AdminUsersActions::class, 'removeRole']);

    Route::post('/change_role', [AdminUsersActions::class, 'changeRole']);

    Route::post('/delete_user', [AdminUsersActions::class, 'deleteUser']);

    Route::get('/reports', [ReportsController::class, 'getAllReports']);

    Route::get('/report/{id}', [ReportsController::class, 'show']);

    Route::post('/report', [ReportsController::class, 'reportActions']);

    Route::get('/get_all_staff', [StaffController::class, 'getStaff']);

    Route::get('/get_requests_admin', [RequestsController::class, 'getRequests']);

    Route::post('/change_featured/{id}', [MakeFeaturedPhoto::class, 'makeFeaturedPhoto']);

    Route::post('/send_report', [SendReport::class, 'sendReport']);
    Route::get('/profile_statistics', [ProfileAnalytics::class, 'analytics']);

    Route::post('/verify_password', [UpdateSensitiveData::class, 'checkCurrPassword']);

    Route::post('/update_email_password', [UpdateSensitiveData::class, 'changeEmailPassword']);

    Route::delete('/delete_account', [DeleteAccount::class, 'deleteAccount']);

    Route::get('/admin_analytics', [AdminAnalytics::class, 'getStatistics']);

    Route::post('/send_request', [RequestEdit::class, 'requestEdit']);

    Route::get('/get_requests', [RequestEdit::class, 'getRequests']);

    Route::post('/change_status_req', [RequestEdit::class, 'changeStatusRequest']);

    Route::get('/get_requests_for_editors', [FetchRequests::class, 'getRequests']);

    Route::get('/get_my_requests', [FetchRequests::class, 'getMyRequests']);

    Route::post('/accept_req_edit', [AcceptEdit::class, 'accept']);

    Route::get('/download_photo/{photoId}', [DownloadImageOriginal::class, 'downloadImage']);

    Route::post('/upload_photo', [UploadResult::class, 'uploadResult']);

    Route::delete('/delete_gallery/{id}', [Galleries::class, 'DeleteGallery']);

    Route::post('/addFollow', [AddFollow::class, 'addFollow']);

    Route::post('/create_gallery', [Galleries::class, 'AddGallery']);
    Route::get('/get_photos', [GetPhotos::class, 'getPhotos']);

    Route::prefix('/edit_profile_pictures')->group(function () {
        Route::post('/avatar', [ProfilePictures::class, 'uploadAvatar']);
        Route::post('/cover', [ProfilePictures::class, 'uploadCover']);

        Route::delete('/delete_avatar', [ProfilePictures::class, 'deleteAvatar']);
        Route::delete('/delete_cover', [ProfilePictures::class, 'deleteCover']);
    });
    Route::post('/upload', [UploadController::class, 'uploadPhoto']);

    Route::resource('/follows', FollowController::class);

    Route::get('/myprofile', [ProfileController::class, 'getInfos']);

    Route::post('/edit_profile', [ProfileController::class, 'editProfile']);

    Route::prefix('/comments')->group(function () {
        Route::post('/store', [CommentController::class, 'store']);
        Route::put('/{id}', [CommentController::class, 'update']);
        Route::delete('/{id}', [CommentController::class, 'destroy']);
    });
    Route::post('/photo/{id}', [PhotoController::class, 'update']);
    Route::delete('/photo/{id}', [PhotoController::class, 'destroy']);

    Route::get('/notifications',[NotificationsController::class, 'index']);

    Route::post('/notifications/mark-as-read', [NotificationsController::class, 'markAsRead']);
});

require __DIR__ . '/auth.php';
