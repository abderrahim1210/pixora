<?php

namespace App\Http\Controllers;

use App\Models\EditingTasks;
use App\Models\EditionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FetchRequests extends Controller
{
    public function getRequests()
    {
        $user = Auth::user();
        $user_id = $user->id;
        try {
            if (!$user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ]);
            }

            if ($user->role !== 'editor') {
                return response()->json([
                    'success' => false,
                    'message' => 'You dont have a permission for get a requests edit in this plateform'
                ]);
            }

            $requests = EditingTasks::with(['user', 'editionRequests.photo'])->get();

            return response()->json([
                'success' => true,
                'requests' => $requests
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Error in " . $e
            ]);
        }
    }

    public function getMyRequests()
    {
        $user_id = Auth::id();
        try {
            if (!$user_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ]);
            }

            $requests = EditionRequest::with(['requester','photo'])->where('requester_id', $user_id)->orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'requests' => $requests
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Error in " . $e
            ]);
        }
    }
}
