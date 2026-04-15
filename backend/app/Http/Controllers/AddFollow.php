<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AddFollow extends Controller
{
    public function addFollow(Request $request)
    {
        $user = Auth::id();
        $following_id = $request->following_id;

        $userExist = DB::table('users')->select('id')->where('id',$following_id)->first();

        if (!$user) return response()->json(['message' => 'Unauthenticated user'],403);
        if (!$userExist) return response()->json(['message' => 'User how you are following not found'],404);

        try{
            DB::table('follows')->insert([
                'follower_id' => $user,
                'following_id' => $following_id,
                'created_at' => now()
            ]);

            return response()->json(['success' => true]);
        }catch(\Exception $e){
            return response()->json(['message' => 'Error in '.$e]);
        }
    }
}
