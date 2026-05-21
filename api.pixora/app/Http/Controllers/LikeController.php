<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Notification;
use App\Models\Photo;
use App\Notifications\PostLikedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        $photo = Photo::with('user')->find($id);
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'You must login first'
            ]);
        }
        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid photo'
            ]);
        }

        $check = Like::with('photo')->where('user_id', $user->id)->where('photo_id', $id)->first();
        if ($check !== null) {
            $check->delete();
            $photo->isLiked = false;
        } else {
            Like::create([
                'user_id' => $user->id,
                'photo_id' => $id
            ]);
            $photo->isLiked = true;
            try {
                $photoOwner = $photo->user;

                if ($photoOwner && $photoOwner->id !== $user->id) {
                    $photoOwner->notify(new PostLikedNotification($user, $photo));
                    Log::info('Notification success for owner: ' . $photoOwner->id);
                }
            } catch (\Exception $e) {
                Log::error('Notification failed: ' . $e->getMessage());
            }
        }

        $totalLikes = Like::where('photo_id', $id)->count();
        return response()->json([
            'success' => true,
            'totalLikes' => $totalLikes,
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
