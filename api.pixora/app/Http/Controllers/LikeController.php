<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $id = $request->photo_id;
        $user = Auth::user();
        $photo = Photo::find($id);
        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'You must login first'
            ]);
        }
        if (!$photo){
            return response()->json([
                'success' => false,
                'message' => 'Invalid photo'
            ]);
        }

        $check = Like::with('photo')->where('user_id',$user->id)->where('photo_id',$id)->first();
        if ($check !== null){
            $check->delete();
            $photo->isLiked = false;
            // $liked = false;
        }else{
            $photo->isLiked = true;
            Like::create([
                'user_id' => $user->id,
                'photo_id' => $id
            ]);
            // $liked = true;
        }

        $totalLikes = Like::where('photo_id',$id)->count();
        return response()->json([
            'success' => true,
            'totalLikes' => $totalLikes,
            // 'liked' => $liked
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Like $like)
    {
        //
    }
}
