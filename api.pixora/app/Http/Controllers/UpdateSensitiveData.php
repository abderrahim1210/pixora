<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
class UpdateSensitiveData extends Controller
{
    public function checkCurrPassword(Request $request)
    {
        $user = Auth::user();
        $pass = $request->password;
        if (Hash::check($pass, $user->password)) {
            return response()->json([
                'success' => true,
                'message' => 'Password matches'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Password mismatches'
            ]);
        }
    }
    
    public function changeEmailPassword(Request $request)
    {
        // $data = $request->data;
        $request->validate([
            'new_email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email'],
            'new_password' => ['required', Rules\Password::defaults()],
        ]);
        $new_email = $request->new_email;
        $new_pass = $request->new_password;

        $user = Auth::user();
        // $user = User::find($user_id);
        try{
            $user->update([
                'email' => $new_email,
                'password' => Hash::make($new_pass)
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Email & password updated'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
