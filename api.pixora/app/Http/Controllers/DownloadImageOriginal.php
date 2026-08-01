<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;

class DownloadImageOriginal extends Controller
{
    public function downloadImage($photoId){
        $photo = Photo::findOrFail($photoId);

        if (!$photo->filename){
            return response()->json([
                'success' => false,
                'message' => 'Imzge not found on server'
            ],404);
        }

        return redirect()->away($photo->filename);
    }
}
