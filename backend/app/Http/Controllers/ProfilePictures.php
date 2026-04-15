<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ProfilePictures extends Controller
{
    public function uploadAvatar(Request $request)
    {
        // $request->validate([
        //     'profile_image' => ['required','image','max:2048']
        // ]);

        $user_id = Auth::id();

        if (!$user_id) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $user = User::find($user_id);

        if ($user->photo_profile && Storage::disk('public')->exists('profile_pictures/' . $user->photo_profile)) {
            Storage::disk('public')->delete('profile_pictures/' . $user->photo_profile);
        }

        $profile_image = $request->profile_image;
        if (!preg_match('/^data:image\/(\w+);base64,/', $profile_image, $type)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid image format'
            ]);
        }
        $ext = strtolower($type[1]);

        $allowed = ['png', 'jpg', 'jpeg', 'webp'];
        if (!in_array($ext, $allowed)) {
            return response()->json([
                'success' => false,
                'message' => 'We are not allow this files'
            ]);
        }

        if (strlen($profile_image) / 1024 / 1024 > 100) {
            return response()->json([
                'success' => false,
                'message' => 'File too large'
            ]);
        }

        $filename = time() . '_' . uniqid() . ".webp";
        $path = storage_path('/app/public/profile_pictures/' . $filename);

        try {
            $img = Image::make($profile_image);
            $img->resize(1200, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $img->encode('webp', 75)->save($path);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error processing" . $e
            ]);
        }

        $user->photo_profile = $filename;
        $user->save();

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

        if ($user->cover_image && Storage::disk('public')->exists('/cover_images/' . $user->cover_image)) {
            Storage::disk('public')->delete('cover_image/' . $user->cover_image);
        }

        $cover_image = $request->cover_image;
        if (!preg_match('/^data:image\/(\w+);base64,/', $cover_image, $type)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid image format'
            ]);
        }

        $ext = strtolower($type[1]);

        $allowed = ['jpeg', 'jpg', 'webp'];

        if (!in_array($ext, $allowed)) {
            return response()->json([
                'success' => false,
                'message' => 'We are not allow this files'
            ]);
        }

        if (strlen($cover_image) / 1024 / 1024 > 100) {
            return response()->json([
                'success' => false,
                'message' => 'File too large'
            ]);
        }

        $filename = time() . '_' . uniqid() . ".webp";
        $path = storage_path('/app/public/cover_images/'.$filename);
        try {
            $img = Image::make($cover_image);
            $img->resize(1200, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $img->encode('webp', 75)->save($path);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Error processing" . $e
            ]);
        }

        $user->cover_image = $filename;
        $user->save();

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

        if ($user->photo_profile && Storage::disk('public')->exists('profile_pictures/' . $user->photo_profile)) {
            Storage::disk('public')->delete('profile_pictures/' . $user->photo_profile);
        }

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

        if ($user->cover_image && Storage::disk('public')->exists('cover_images/' . $user->cover_image)) {
            Storage::disk('public')->delete('cover_images/' . $user->cover_image);
        }

        $user->cover_image = null;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Cover image deleted successfully'
        ]);
    }
}
