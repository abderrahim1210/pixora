<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

            $is_paid = DB::table('images')->where('request_id', $req_id)->select('is_paid')->first();
            if ($is_paid) {
                return response()->json([
                    'success' => true,
                    'message' => 'The image is paid'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'The image is not paid'
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
