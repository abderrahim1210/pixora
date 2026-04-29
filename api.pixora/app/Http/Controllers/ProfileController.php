<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
// use Illuminate\Http\Client\Request;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function getInfos()
    {

        $user = User::with([
            'photos' => function($query){
                $query->select('id','title','filename','user_id')->latest()->limit(4);
            }
        ])->withCount(['likes','followers','followings'])->find(Auth::id());

        if (!$user) {
            return response()->json([
                'success' => false,
            ], 401);
        }

        $photos_count = DB::table('photos')->where('user_id',$user->id)->count();

        return response()->json([
            'success' => true,
            'user' => $user,
            'photos' => $user->photos,
            'photosCount' => $photos_count,
            'statistics' => [
                'likes' => $user->likes_count,
                'followers' => $user->followers_count,
                'followings' => $user->followings_count,
                'photos_count' => $user->photos->count()
            ]
        ]);
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

        if ($user->isDirty()) {
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Updated profile successfully'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'No updated detected'
            ]);
        }
    }
}
