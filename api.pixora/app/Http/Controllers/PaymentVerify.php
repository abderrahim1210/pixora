<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentVerify extends Controller
{
    public function pay(Request $request)
    {
        $req_id = $request->req_id;
        $transaction_id = $request->transaction_id;
        try {
            if (!$req_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Request id not found'
                ]);
            }

            $request_settings = DB::table('payments')->where('request_id', $req_id)->first();
            if (!$request_settings){
                return response()->json([
                    'success' => false,
                    'message' => 'Payment record not found.'
                ]);
            }

            DB::table('payments')->where('request_id',$req_id)->update([
                'status' => 'completed',
                'transaction_id' => $transaction_id
            ]);

            DB::table('images')->where('request_id',$req_id)->update([
                'is_paid' => true
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment processed successfully from PayPal!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
