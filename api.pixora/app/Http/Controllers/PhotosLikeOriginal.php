<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;

class PhotosLikeOriginal extends Controller
{
    public function GetPhotos(Request $request)
    {
        if (!$request->category && !$request->title && !$request->tags) {
            return response()->json([
                'success' => true,
                'photos' => []
            ]);
        }
        $photos = Photo::with('user')
            ->where('id','!=',$request->id)
            ->where(function ($query) use ($request) {
                $query->when($request->category, function ($q) use ($request) {
                    $q->orWhere('category_id', $request->category);
                })
                    ->when($request->title, function ($q) use ($request) {
                        $q->orWhere('title', 'LIKE', "%{$request->title}%");
                    })
                    ->when($request->tags, function ($q) use ($request) {
                        $q->orWhere('tags', 'LIKE', "%{$request->tags}%");
                    });
            })
            ->limit(10)
            ->get();
        return response()->json([
            'success' => true,
            'photos' => $photos
        ]);
    }
}
