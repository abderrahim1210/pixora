<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Http\Request;

class Photographer extends Controller
{
    public function getInformations(String $id)
    {
        $photographer = User::find($id);

        if (!$photographer){
            return response()->json([
                'success' => false,
                'message' => 'Photographer not found'
            ]);
        }

        $photos = $photographer->photos;
        $likes = $photographer->likes->count();
        $followers = Follow::where('following_id',$photographer->id)->count();
        $followings = Follow::where('follower_id',$photographer->id)->count();
        $galleries = Gallery::select('id','title','description','user_id')->with(['user:id,username','photos' => function($q) {
            $q->select('photos.id','filename');
        }])->withCount('photos')->where('user_id',$id)->get();

        return response()->json([
            'success' => true,
            'photographer' => $photographer,
            'photos' => $photos,
            'galleries' => $galleries,
            'statistics' => [
                'likes' => $likes,
                'followings' => $followings,
                'followers' => $followers
            ]
        ]);
    }
}
