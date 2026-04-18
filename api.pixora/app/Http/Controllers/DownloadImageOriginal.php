<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;

class DownloadImageOriginal extends Controller
{
    public function downloadImage($photoId){
        $photo = Photo::findOrFail($photoId);

        $file_path = storage_path('app/public/photos/'.$photo->filename);

        if (!file_exists($file_path)){
            return response()->json([
                'success' => false,
                'message' => 'File not found on server'
            ],404);
        }

        return response()->download($file_path,$photo->filename ?? 'image.png');
    }
}
