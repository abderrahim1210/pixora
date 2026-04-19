<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Facades\Image;
use Intervention\Image\ImageManager;

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
        $type = $photo['type'] ?? null;
        $width = $photo['width'] ?? null;
        $height = $photo['height'] ?? null;
        $ratio = $photo['ratio'] ?? null;
        $orientation = $photo['orientation'] ?? null;
        $tags = $photo['tags'] ?? "";
        $size = $photo['size'] ?? "";
        $image = $photo['image'];
        $location = $photo['location'] ?? "";
        $gallery_id = $photo['gallery_id'] ?? null;


        preg_match('/^data:image\/(\w+);base64,/', $image, $matches);
        $ext = strtolower($matches[1]);

        $allowed = ['png', 'jpg', 'jpeg'];
        if (!in_array($ext, $allowed)) {
            return response()->json([
                'success' => false,
                'message' => 'We are not allow this files'
            ]);
        }

        if (strlen($image) / 1024 / 1024 > 100) {
            return response()->json([
                'success' => false,
                'message' => 'File too large'
            ]);
        }

        $filename = time() . '_' . uniqid() . ".webp";
        $path = storage_path('/app/public/photos/' . $filename);

        try {
            
            $manager = new ImageManager(new Driver());

            $img = $manager->read($image);
            
            $img->scale(width:1200);

            $img->toWebp(75)->save($path);

            $newSize = filesize($path);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error processing']);
        }

        $photoModel = Photo::create([
            'user_id' => $user->id,
            'title' => $title,
            'description' => $description,
            'type' => $type,
            'filename' => $filename,
            'category_id' => $category,
            'size' => $newSize ?? ($photo['size']),
            'width' => $img->width(),
            'height' => $img->height(),
            'ratio' => $ratio,
            'orientation' => $orientation,
            'tags' => $tags,
            'gallery_id' => $gallery_id
        ]);

        if ($gallery_id) {
            DB::table('gallery_photos')->insert([
                'photo_id' => $photoModel->id,
                'gallery_id' => $gallery_id,
                'created_at' => now()
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Uploaded photo successfully'
        ]);
    }
}
