<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Like;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetPhotos extends Controller
{
    public function getPhotos()
    {
        $user = Auth::user();
        $photos = Photo::with(['user'])->where('user_id',$user->id)->get();
        $id = $user->id;
        
        $photosLikes = Photo::whereHas('likes',function($q) use ($id){
            $q->where('user_id',$id);
        })->get();
        
        $followers = Follow::where('follower_id',$user->id)->get();
        $followings = Follow::where('following_id',$user->id)->get();

        return response()->json([
            'success' => true,
            'photos' => $photos ?: [],
            'photosLikes' => $photosLikes,
            'statistics' => [
                'followers' => $followers,
                'followings' => $followings
            ]
        ]);
    }
}
