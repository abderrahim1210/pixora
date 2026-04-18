<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Nette\Utils\Json;

class Home extends Controller
{
    public function getAllPhotos(): JsonResponse
    {
        $current_user = Auth::user();

        $photos = Photo::select('id', 'filename', 'title', 'user_id')->withCount('likes')->where('visibility', 'public')->latest()->get()
            ->map(function ($photo) use ($current_user) {
                $photo->isLiked = $current_user
                    ? $photo->likes()->where('user_id', $current_user->id)->exists()
                    : false;
                return $photo;
            });
        $users = User::select('id', 'username')->get();
        
        return response()->json(['success' => true, 'photos' => $photos, 'current_user' => $current_user, 'users' => $users]);
    }
}
