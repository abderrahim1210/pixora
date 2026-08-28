<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckPaidPhoto extends Controller
{
    public function check($req_id)
    {
        try {
            if (!$req_id && !is_numeric($req_id)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Request id not found or not numeric'
                ]);
            }

            $edition_request = DB::table('editing_tasks')->where('requester_id', Auth::id())->where('request_id', $req_id)->first();

            if (!$edition_request) {
                return response()->json([
                    'success' => false,
                    'message' => 'Your dont have a permission for paid at this edit.'
                ]);
            }

            $imageRecord = DB::table('images')->where('request_id', $req_id)->select('is_paid')->first();
            if ($imageRecord && $imageRecord->is_paid === 1) {
                return response()->json([
                    'success' => true,
                    'message' => 'The image is paid'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
