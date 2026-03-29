<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Galleries extends Controller
{
    public function AddGallery(Request $request)
    {
        // $gallery = Gallery::find($request->id);

        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $request->validate([
            'title' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            // 'user_id' => ['required', 'exist:users,id']
        ]);

        $title = $request->title;
        $description = $request->description;

        Gallery::create([
            'title' => $title,
            'description' => $description,
            'user_id' => $user->id
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Gallery added successfully'
        ]);
    }

    public function GetGallery(String $id)
    {
        $user = Auth::user();

        // $gallery = Gallery::find($id);


        $gallery = Gallery::with(['photos' => function ($q) {
            $q->select('photos.id','filename','title','type','width','height','size');
        }])->where('id', $id)->where('user_id', $user->id)->first();

        if (!$gallery) {
            return response()->json([
                'success' => false,
                'message' => 'Gallery not found'
            ]);
        }

        return response()->json([
            'success' => true,
            'gallery' => $gallery
        ]);
    }

    public function DeleteGallery($id)
    {
        $user = Auth::user();
        if (!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $gallery = Gallery::with(['photos'])->where('id',$id)->where('user_id',$user->id)->first();

        if (!$gallery){
            return response()->json([
                'success' => false,
                'message' => 'Gallery not found'
            ]);
        }

        $gallery->photos()->detach();
        $gallery->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gallery deleted successfully'
        ]);
    }
}
