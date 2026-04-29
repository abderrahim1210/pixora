<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SendReport extends Controller
{
    public function sendReport(Request $request)
    {
        // $request->validate([
        //     'reason' => ['required','in:spam,copyright,inappropriate_content,other']
        // ]);
        $data = $request->data;
        $id = $data['id'];
        $reason = $data['reason'];
        $description = $data['description'];
        $type = $data['type'];
        $user = Auth::user();

        if (!$user){
            return response()->json([
                'success' => false,
            ],403);
        }

        if (!$reason){
            return response()->json([
                'success' => false,
                'message' => 'Reason is obligatory'
            ]);
        }

        try{
            DB::table('reports')->insert(['user_id' => $user->id, 'reason' => $reason, 'description' => $description, 'reportable_type' => $type, 'reportable_id' => $id, 'created_at' => now()]);
            return response()->json([
                'success' => true,
                'message' => 'Report sent successfully'
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e
            ]);
        }
    }
}
