<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $id = $user->id;
        $follows = User::find($id)->following;

        return response()->json([
            'users' => $follows
        ]);
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
        $user = Auth::user();
        $user_id = $request->followerID;

        $f = Follow::where('follower_id',$user->id)->where('following_id',$user_id)->first();

        if ($f){
            $f->delete();
            return response()->json([
                'status' => 'Unfollowed'
            ]);
        }else{
            Follow::create([
                'follower_id' => $user->id,
                'following_id' => $user_id
            ]);
            return response()->json([
                'status' => 'followed'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Follow $follow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Follow $follow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Follow $follow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Follow $follow)
    {
        //
    }
}
