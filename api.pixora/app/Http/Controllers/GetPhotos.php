<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Gallery;
use App\Models\Like;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetPhotos extends Controller
{
    public function getPhotos()
    {
        $user = User::find(Auth::id());
        $photos = Photo::with(['user'])->select('id','title','filename','user_id')->where('user_id',$user->id)->get();
        $id = $user->id;
        
        $photosLikes = Photo::whereHas('likes',function($q) use ($id){
            $q->where('user_id',$id);
        })->get();
    
        $galleries = Gallery::select('id','title','description','user_id')->with(['user:id,username','photos' => function($q) {
            $q->select('photos.id','filename');
        }])->withCount('photos')->where('user_id',$user->id)->get();

        return response()->json([
            'success' => true,
            'photos' => $photos ?: [],
            'photosLikes' => $photosLikes,
            'galleries' => $galleries
        ]);
    }
}
