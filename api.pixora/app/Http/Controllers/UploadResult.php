<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use function Symfony\Component\Clock\now;

class UploadResult extends Controller
{
    public function uploadResult(Request $request)
    {
        $image = $request->image;
        $photoId = $request->photo_id;
        $ownerId = $request->ownerId;
        $requester_id = $request->requester_id;
        $req_id = $request->req_id;
        $task_id = $request->task_id;
        $editor_id = Auth::id();
        $user = User::find($editor_id);
        if ($user->role !== 'editor'){
            return response()->json([
                'success' => false,
                'message' => 'You not have a permission for do it this action'
            ],403);
        }
        try {
            preg_match('/^data:image\/(\w+);base64,/', $image, $matches);
            $ext = strtolower($matches[1]);

            $image = substr($image, strpos($image, ',') + 1);
            $image = base64_decode($image);

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

            $filename = uniqid() . "edited_image_req_id" . $req_id . "_taks_id_" . $task_id . "." . $ext;

            Storage::disk('public')->put('edited_images/' . $filename, $image);
            DB::table('images')->insert([
                'path' => $filename,
                'owner_id' => $ownerId,
                'parent_id' => $photoId,
                'request_id' => $req_id,
                'status' => 'accepted',
                'created_at' => now(),
                'editor_id' => $editor_id

            ]);

            DB::table('editing_tasks')->where('id',$task_id)->update([
                'status' => 'completed',
                'edited_file_url' => "edited_images/" . $filename,
                'updated_at' => now()
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Photo uploaded result successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Error in " . $e
            ]);
        }
    }
}
