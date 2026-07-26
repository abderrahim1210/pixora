<?php

namespace App\Http\Controllers;

use App\Models\PaymentSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ManagePaymentsAccounts extends Controller
{
    public function get_accounts() {
        $user = User::find(Auth::id());
        if (!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ],401);
        }
        try{
            $accounts = PaymentSetting::where('user_id',$user->id)->get();
            return response()->json([
                'success' => true,
                'accounts' => $accounts
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
