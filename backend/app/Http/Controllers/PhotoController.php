<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\EditionRequest;
use App\Models\Image;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function show($id)
    {
        $user = Auth::user();
        $photo = Photo::with(['user', 'category', 'comments.user', 'likes', 'galleries'])->withCount('likes')->find($id);
        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'Photo not found'
            ]);
        }
        $request = EditionRequest::where('image_id', $photo->id)->where('requester_id', $user->id)->first();

        $photo->created_at_human = $photo->created_at->diffForHumans();
        $photo->comments->each(function ($comment) {
            $comment->created_at_human = $comment->created_at->diffForHumans();
        });
        $photo->isLiked = $user ? $photo->likes->contains('user_id', $user->id) : false;

        $photos_edits = Image::with(['parent','request'])->where('parent_id', $photo->id)->get();
        return response()->json([
            'success' => true,
            'photo' => $photo,
            'likes' => $photo->likes_count,
            'currUser' => $user,
            'category' => $photo->category,
            'categories' => [],
            'comments' => $photo->comments,
            'galleries' => $photo->galleries,
            'request' => $request,
            'photos_edits' => $photos_edits
        ]);
    }

    public function update(Request $request, $id)
    {
        $title = $request->title ?? null;
        $description = $request->description ?? null;
        $location = $request->location ?? null;
        $category = $request->category_id ?? null;
        $visibility = $request->visibility ?? null;
        $tags = $request->tags ?? null;
        $galleries = $request->galleries ?? null;

        $photo = Photo::find($id);

        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'Photo not found'
            ]);
        }

        if (($title !== null && $title === $photo->title) &&
            ($description !== null && $description === $photo->description) &&
            ($location !== null && $location === $photo->location) &&
            ($category !== null && $category === $photo->category_id && $visibility === $photo->visibility && $tags === $photo->tags)
        ) {
            return response()->json([
                'success' => false,
                'message' => 'No changes made'
            ]);
        }

        if ($category !== null) {
            $photo->category_id = $category;
        }

        if ($description !== null) {
            $photo->description = $description;
        }

        if ($title !== null) {
            $photo->title = $title;
        }

        if ($location !== null) {
            $photo->location = $location;
        }

        if ($visibility !== null) {
            $photo->visibility  = $visibility;
        }

        if ($tags !== null) {
            $photo->tags = $tags;
        }

        if ($galleries !== null) {
            // foreach ($galleries as $g) {
            //     DB::table('gallery_photos')->insert([
            //         'photo_id' => $photo->id,
            //         'gallery_id' => $g,
            //         'created_at' => now(),
            //         'updated_at' => now()
            //     ]);
            // }
            $photo->galleries()->sync($galleries);
        }

        $photo->save();

        return response()->json([
            'success' => true,
            'message' => 'Photo updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $photo = Photo::with(['likes', 'comments'])->find($id);

        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'Photo not found'
            ]);
        }

        $user = Auth::user();
        if ($photo->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => "You don't have a permission for delete this photo"
            ]);
        }

        DB::table('gallery_photos')
            ->where('photo_id', $photo->id)
            ->delete();

        $photo->likes()->delete();

        $photo->comments()->delete();

        $photo->delete();

        Storage::disk('public')->delete('photos/' . $photo->filename);

        return response()->json([
            'success' => true,
            'message' => 'Photo deleted successfully'
        ]);
    }
}
