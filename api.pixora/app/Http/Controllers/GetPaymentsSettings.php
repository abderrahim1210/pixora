<?php

namespace App\Http\Controllers;

use App\Models\PaymentSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetPaymentsSettings extends Controller
{
    public function get_payments()
    {
        $user = User::find(Auth::id());
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 401);
        }

        $payments = PaymentSetting::where('user_id', $user->id)->get();

        if (!$payments) {
            return response()->json([
                'success' => false,
                'message' => 'Nothing payments now - try again later !'
            ]);
        }

        return response()->json([
            'success' => true,
            'payments_accounts' => $payments
        ]);
    }
}
