<?php

namespace App\Http\Controllers;

use App\Models\EditionRequest;
use App\Models\Image;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RequestEdit extends Controller
{
    public function requestEdit(Request $request)
    {
        $request->validate([
            'message' => ['string', 'max:100']
        ]);

        $message = $request->message;
        $owner_id = $request->owner_id;
        $requester_id = Auth::id();
        $image_id = $request->image_id;
        $message = trim($message);

        try {
            DB::table('edition_requests')->insert([
                'image_id' => $image_id,
                'requester_id' => $requester_id,
                'message' => $message,
                'owner_id' => $owner_id,
                'created_at' => now()
            ]);

            

            return response()->json([
                'success' => true,
                'message' => 'Request edit sent !'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error in ' . $e
            ]);
        }
    }


    public function getRequests()
    {
        $user_id = Auth::id();
        $requests = EditionRequest::with(['requester', 'photo:id,filename,title'])->where('owner_id', $user_id)->get()->groupBy('image_id');
        return response()->json([
            'success' => true,
            'requests' => $requests
        ]);
    }

    public function changeStatusRequest(Request $request)
    {
        $req_id = $request->req_id;
        $request_id = $request->id;
        $type = $request->type;
        try {
            if ($type === 'reject') {
                DB::table('edition_requests')->where('id', $req_id)->update([
                    'status' => 'rejected'
                ]);

                DB::table('edition_requests')->delete($req_id);

                return response()->json([
                    'success' => true,
                    'message' => 'You are rejected this request'
                ]);
            } else {
                DB::table('edition_requests')->where('requester_id', $req_id)->update([
                    'status' => 'approved'
                ]);

                DB::table('editing_tasks')->insert([
                    'requester_id' => $req_id,
                    'request_id' => $request_id,
                    'created_at' => now()
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'You are accept this request'
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Error in " . $e
            ]);
        }
    }
}
