<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DeleteAccount extends Controller
{
    public function deleteAccount(Request $request)
    {
        // $user = Auth::id();
        $user = $request->user();
        try {
            Auth::guard('web')->logout();

            if ($user) {
                $user->delete();
            }

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'success' => true,
                'message' => 'Account deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Error in ".$e->getMessage()
            ]);
        }
    }
}
