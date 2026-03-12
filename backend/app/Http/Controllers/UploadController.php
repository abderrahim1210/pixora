<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function uploadPhoto(Request $request){
        $request->validate([
            'title' => ['required','string','min:3'],
            'description' => ['string'],
            'category' => ['required'],
            'type' => ['in:free,licensed'],
        ]);

        
    }
}
