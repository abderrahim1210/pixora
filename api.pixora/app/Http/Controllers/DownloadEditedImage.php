<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DownloadEditedImage extends Controller
{
    public function download($request_id)
    {
        $edit_request = DB::table('editing_tasks')->where('request_id', $request_id)->where('requester_id', Auth::id())->first();
        if (!$edit_request) {
            return response()->json([
                'success' => false,
                'message' => 'You dont have a permission for download this photo.'
            ]);
        }
        $image = DB::table('images')->where('request_id', $request_id)->first();
        if (!$image) {
            return response()->json([
                'success' => false,
                'message' => 'Image by this request id not found.'
            ]);
        }
        return response()->json([
            'success' => true,
            'image' => $image
        ]);
    }
}
