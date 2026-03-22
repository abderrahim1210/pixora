<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
// use Illuminate\Http\Client\Request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getInfos()
    {
        $user = Auth::user();
        $photos = $user->photos;
        $likes = $user->likes->count();
        $followers = Follow::where('following_id', $user->id)->count();
        $followings = Follow::where('follower_id', $user->id)->count();
        if ($user) {
            return response()->json([
                'success' => true,
                'user' => $user,
                'photos' => $photos ?: [],
                'photosCount' => $photos->count(),
                'statistics' => [
                    'likes' => $likes,
                    'followers' => $followers,
                    'followings' => $followings
                ]
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }
    }

    public function editProfile(Request $request)
    {
        $birh_date = $request->birth_date;

        $u = Auth::user();
        $user = User::find($u->id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        if (empty($birh_date) || $birh_date === "0000-00-00") {
            $birh_date = null;
        } else {
            $birh_date = $birh_date;
        }

        $user->fill($request->only([
            'username',
            'email',
            'display_name',
            'bio',
            'gender',
            'country',
            'facebook',
            'website',
            'insta',
            'x'
        ]));

        $user->phone_number = $request->phone;
        $user->instagram = $request->insta;
        $user->birth_date = $birh_date;

        if ($user->isDirty()){
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Updated profile successfully'
            ]);            
        }else{
            return response()->json([
                'success' => false,
                'message' => 'No updated detected'
            ]);
        }
    }
}
