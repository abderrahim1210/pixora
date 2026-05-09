<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AdminUsersActions extends Controller
{
    public function removeRole(Request $request)
    {
        $user_id = $request->user_id;
        $user = User::find($user_id);
        $current_user_id = Auth::id();
        $current_user = User::find($current_user_id);
        if ($current_user->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'You dont have a permission for remove role from staff'
            ]);
        }

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User by this id does not exist'
            ]);
        }

        DB::table('users')->where('id', '=', $user_id)->update(['role' => 'user']);

        return response()->json([
            'success' => true,
            'message' => 'User removed successfully from staff'
        ]);
    }

    public function changeRole(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|in:admin,editor,user',
        ]);

        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'You dont have a permission for remove role from staff'
            ]);
        }

        $user_id = $request->user_id;
        $role = $request->role;

        $user = User::find($user_id);

        if (Auth::id() === $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot change your own role.'
            ], 400);
        }

        $user->update(['role' => $role]);

        return response()->json([
            'success' => true,
            'message' => "Role changed to {$request->role} successfully."
        ]);
    }

    public function deleteUser(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        if (Auth::user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'You dont have a permission for remove role from staff'
            ]);
        }

        $user_id = $request->user_id;
        $user = User::find($user_id);

        if (Auth::id() === $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot delete your account.'
            ], 400);
        }

        $user->delete();
        return response()->json([
            'success' => true,
            'message' => "{$user->username} has been deleted successfully."
        ]);
    }
}
