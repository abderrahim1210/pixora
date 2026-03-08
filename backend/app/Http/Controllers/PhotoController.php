<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PhotoController extends Controller
{
    public function show($id){
        // if (!$id){
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Id not found.'
        //     ]);
        // }else{
            $user = Auth::user();
            $photo = Photo::with(['user','comments.user','category','likes'])->find($id);
        if (!$photo){
            return response()->json([
                'success' => false,
                'message' => 'Photo not found'
            ]);
        }

        $totalLikes = $photo->llikes->count();
        $isLiked = false;
        if ($user){
            $isLiked = $user->likes->where('user_id',$user->id)->count() > 0;
        }

        foreach($photo->comments as $comment){
            $comment->created_at_human = $comment->created_at->diffForHumans();
        }

        return response()->json([
            'success' => true,
            'photo' => $photo,
            'likes' => $totalLikes,
            'currUser' => $user,
            'category' => $photo->category,
            'comments' => $photo->comments,
            'categories' => Category::all()
        ]);
        // }
    }
}
