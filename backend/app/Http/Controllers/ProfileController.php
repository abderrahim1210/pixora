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
        // $username = $request->username;
        // $d_name = $request->display_name;
        // $email = $request->email;
        // $tel = $request->tel;
        // $bio = $request->bio;
        $birh_date = $request->birth_date;
        // $gender = $request->gender;
        // $country = $request->country;
        // $facebook = $request->facebook;
        // $website = $request->website;
        // $insta = $request->insta;
        // $x = $request->x;

        $u = Auth::user();
        $user = User::find($u->id);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $editDetected = false;

        // if ($username !== $user->username) {
        //     $user->username = $username;
        //     $editDetected = true;
        // }

        // if ($email !== $user->email) {
        //     $user->email = $email;
        //     $editDetected = true;
        // }

        // if ($tel !== $user->phone_number) {
        //     $user->phone_number = $tel;
        //     $editDetected = true;
        // }

        // if ($d_name !== $user->display_name) {
        //     $user->display_name = $d_name;
        //     $editDetected = true;
        // }

        // if ($bio !== $user->bio) {
        //     $user->bio = $bio;
        //     $editDetected = true;
        // }

        // if ($gender !== $user->gender) {
        //     $user->gender = $gender;
        //     $editDetected = true;
        // }

        // if ($country !== $user->country) {
        //     $user->country = $country;
        //     $editDetected = true;
        // }

        if (empty($birh_date) || $birh_date === "0000-00-00") {
            $birh_date = null;
        } else {
            $birh_date = $birh_date;
        }

        // if ($birh_date !== $user->birth_date) {
        //     $user->birth_date = $birh_date;
        //     $editDetected = true;
        // }

        // if ($facebook !== $user->facebook) {
        //     $user->facebook = $facebook;
        //     $editDetected = true;
        // }
        // if ($insta !== $user->instagram) {
        //     $user->instagram = $insta;
        //     $editDetected = true;
        // }
        // if ($website !== $user->website) {
        //     $user->website = $website;
        //     $editDetected = true;
        // }
        // if ($x !== $user->x) {
        //     $user->x = $x;
        //     $editDetected = true;
        // }

        // if ($editDetected) {
        //     $user->save();
        //     return response()->json([
        //         'success' => true,
        //         'message' => 'Updated profile successfully'
        //     ]);
        // }
        // return response()->json([
        //     'success' => false,
        //     'message' => 'No updated detected'
        // ]);

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
