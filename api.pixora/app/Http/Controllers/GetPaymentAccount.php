<?php

namespace App\Http\Controllers;

use App\Models\PaymentSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetPaymentAccount extends Controller
{
    public function get_account()
    {
        try {
            $account = PaymentSetting::where('user_id', Auth::id())->latest()->first();
            if (!$account) {
                return response()->json([
                    'success' => false,
                    'message' => 'Payment account not found'
                ]);
            }

            return response()->json([
                'success' => true,
                'account' => $account
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
