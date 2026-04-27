<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Nette\Utils\Json;

class Home extends Controller
{
    public function getAllPhotos(): JsonResponse
    {
        $current_user = Auth::user();
        $followedIds = $current_user
            ? DB::table('follows')
            ->where('follower_id', $current_user->id)
            ->pluck('following_id')
            : collect([]);
        $photos = Photo::select('id', 'filename', 'title', 'user_id', 'is_featured')
            ->withCount('likes')
            ->when($current_user, function ($query) use ($current_user) {
                return $query->withExists(['likes as isLiked' => function ($q) use ($current_user) {
                    $q->where('user_id', $current_user->id);
                }]);
            })
            ->where('visibility', 'public')
            ->when($current_user && $followedIds->isNotEmpty(), function ($query) use ($followedIds) {
                return $query->orderByRaw("FIELD(user_id, " . $followedIds->implode(',') . ") DESC");
            })
            ->latest()
            ->limit(20)
            ->get();

        $explorePhotos = Photo::select('id', 'title', 'filename', 'is_featured','user_id')->withCount('likes')->when($current_user, function ($query) use ($current_user) {
            return $query->withExists(['likes as isLiked' => function ($q) use ($current_user) {
                $q->where('user_id', $current_user->id);
            }]);
        })->where('visibility', 'public')->orderBy('likes_count', 'desc')->inRandomOrder()->get();

        $galleries = Gallery::with(['user:id,username','photos' => function ($q) {
            $q->select('photos.id','filename')->limit(4);
        }])->limit(40)->get();
        $users = User::select('id', 'username', 'photo_profile')->where('role', 'user')->get();

        return response()->json(['success' => true, 'photos' => $photos, 'explore_photos' => $explorePhotos, 'current_user' => $current_user, 'users' => $users,'galleries' => $galleries]);
    }
}
