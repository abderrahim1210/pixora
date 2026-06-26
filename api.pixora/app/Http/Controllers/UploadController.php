<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class UploadController extends Controller
{
    public function uploadPhoto(Request $request)
    {

        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'You need to login first for upload a photo'
            ]);
        }

        $user = Auth::user();

        $photo = $request->photo_data;
        $title = $photo['title'];
        $description = $photo['description'] ?? null;
        $category = $photo['category'] ?? null;
        $ratio = $photo['ratio'] ?? null;
        $orientation = $photo['orientation'] ?? null;
        $tags = $photo['tags'] ?? "";
        $image = $photo['image'];
        $gallery_id = $photo['gallery_id'] ?? null;
        $visibilty = $photo['visibility'];


        $check = new \App\Http\Controllers\ValideImage();
        $valide = $check->valide($image);

        if ($valide) {
            try {
                $upload = new \App\Http\Controllers\CloudinaryActions();
                $res = $upload->upload($image, 'pixora_photos');
                $imageUrl = $res['image_url'];
                $photoModel = Photo::create([
                    'user_id' => $user->id,
                    'title' => $title,
                    'description' => $description,
                    'filename' => $imageUrl,
                    'category_id' => $category,
                    'size' => $newSize ?? ($photo['size']),
                    'width' => $res['width'],
                    'height' => $res['height'],
                    'ratio' => $ratio,
                    'orientation' => $orientation,
                    'tags' => $tags,
                    'gallery_id' => $gallery_id,
                    'visibility' => $visibilty
                ]);

                if ($gallery_id) {
                    DB::table('gallery_photos')->insert([
                        'photo_id' => $photoModel->id,
                        'gallery_id' => $gallery_id,
                        'created_at' => now()
                    ]);
                }
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Upload failed: ' . $e->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Image not supported'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Uploaded photo successfully'
        ]);
    }
}
