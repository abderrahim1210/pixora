<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfilePictures extends Controller
{
    public function uploadAvatar(Request $request)
    {
        $user_id = Auth::id();

        if (!$user_id) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $user = User::find($user_id);

        if ($user->photo_profile) {
            $cloudinary = new \App\Http\Controllers\CloudinaryActions();
            $cloudinary->destroy($user->photo_profile, 'pixora_photos_profile/', 'profile_pictures/');
        }
        $profile_image = $request->profile_image;

        $check = new \App\Http\Controllers\ValideImage();
        $valide = $check->valide($profile_image);

        if ($valide) {
            try {
                $upload = new \App\Http\Controllers\CloudinaryActions();
                $res = $upload->upload($profile_image, 'pixora_photos_profile');
                $imageUrl = $res['image_url'];
                $user->photo_profile = $imageUrl;
                $user->save();
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
            'message' => 'Profile picture updated successfully'
        ]);
    }

    public function uploadCover(Request $request)
    {
        $user_id = Auth::id();

        if (!$user_id) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $user = User::find($user_id);


        $cover_image = $request->cover_image;


        $check = new \App\Http\Controllers\ValideImage();
        $valide = $check->valide($cover_image);

        if ($valide) {
            try {
                $upload = new \App\Http\Controllers\CloudinaryActions();
                $res = $upload->upload($cover_image, 'cover_images');
                $imageUrl = $res['image_url'];
                $user->cover_image = $imageUrl;
                $user->save();
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
            'message' => 'Cover image updated successfully'
        ]);
    }

    public function deleteAvatar()
    {
        $user_id = Auth::id();

        if (!$user_id) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $user = User::find($user_id);

        $cloudinary = new \App\Http\Controllers\CloudinaryActions();
        $cloudinary->destroy($user->photo_profile, 'pixora_photos_profile/', 'profile_pictures/');

        $user->photo_profile = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Photo profile deleted successfully'
        ]);
    }

    public function deleteCover()
    {
        $user_id = Auth::id();

        if (!$user_id) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $user = User::find($user_id);

        $cloudinary = new \App\Http\Controllers\CloudinaryActions();
        $cloudinary->destroy($user->cover_image, 'cover_images/', 'cover_images/');

        $user->cover_image = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Cover image deleted successfully'
        ]);
    }
}
