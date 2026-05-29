<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class GetFollowsListe extends Controller
{
    public function getFollows(Request $request)
    {
        $user = User::find($request->user_id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found']);
        }
        try {
            $users = ($request->type === 'followers')
                ? $user->followerUsers
                : $user->followingUsers;
            return response()->json([
                'success' => true,
                'users' => $users
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
