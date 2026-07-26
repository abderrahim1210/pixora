<?php

namespace App\Http\Controllers;

use App\Models\PaymentSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ManagePaymentsAccounts extends Controller
{
    public function get_accounts()
    {
        $user = User::find(Auth::id());
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 401);
        }
        try {
            $accounts = PaymentSetting::where('user_id', $user->id)->get();
            return response()->json([
                'success' => true,
                'accounts' => $accounts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
        $user = User::find(Auth::id());
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 401);
        }

        try {
            $account = PaymentSetting::where('user_id',$user->id)->find($id);

            if (!$account) {
                return response()->json([
                    'success' => false,
                    'message' => "Payout account by id $id not found"
                ], 400);
            }
            
            $isActive = PaymentSetting::where('user_id',$user->id)->whereNull('deleted_at')->count();

            if ($account->is_default && $isActive > 1){
                return response()->json([
                    'success' => false,
                    'message' => 'Please set another account as default before deleting this one.'
                ],422);
            }

            $account->update([
                'is_default' => 0
            ]);
            $account->delete();

            return response()->json([
                'success' => true,
                'message' => 'Payment account deleted successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
