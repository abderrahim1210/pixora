<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DownloadEditedImage extends Controller
{
    public function download($request_id)
    {
        $image = DB::table('images')->where('request_id',$request_id)->first();
        if (!$image){
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
