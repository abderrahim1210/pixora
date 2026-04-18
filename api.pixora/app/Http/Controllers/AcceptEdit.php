<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AcceptEdit extends Controller
{
    public function accept(Request $request)
    {
        $req_id = $request->req_id;
        $user_id = Auth::id();
        $task_id = $request->task_id;

        try{
            DB::table('editing_tasks')->where('request_id',$req_id)->where('id',$task_id)->update([
                'status' => 'in_progress',
                'editor_id' => $user_id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'You are accept this task !'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => "Error in ".$e
            ]);
        }
    }
}
