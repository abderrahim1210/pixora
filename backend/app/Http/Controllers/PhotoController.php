<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PhotoController extends Controller
{
    public function show($id)
    {
        // $id = $request->id;
        $user = Auth::user();
        $photo = Photo::with(['user', 'category', 'comments.user','likes'])->withCount('likes')->find($id);
        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'Photo not found'
            ]);
        }

        $photo->created_at_human = $photo->created_at->diffForHumans();
        // $photo->isLiked = $photo->likes->where('user_id',$user->id)->count() > 0;
        $photo->isLiked = $user ? $photo->likes->contains('user_id', $user->id) : false;
        return response()->json([
            'success' => true,
            'photo' => $photo,
            'likes' => $photo->likes_count,
            'currUser' => $user,
            // 'isLiked' => $isLiked,
            'category' => $photo->category,
            'categories' => [],
            'comments' => $photo->comments,
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $photo = Photo::find($id);

        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'Photo not found'
            ]);
        }
    }
}
