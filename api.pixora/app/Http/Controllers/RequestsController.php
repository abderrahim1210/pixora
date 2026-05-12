<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RequestsController extends Controller
{
    public function getRequests()
    {
        $user = Auth::user();
        try {
            if ($user->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'You dont have a permission for get the Pixora requests edit.'
                ]);
            }

            $requests = DB::table('edition_requests as er')
                ->join('users as req', 'er.requester_id', '=', 'req.id')
                ->join('users as own', 'er.owner_id', '=', 'own.id')
                ->join('photos as p', 'er.image_id', '=', 'p.id')
                ->leftJoin('editing_tasks as et', 'er.id', '=', 'et.request_id')
                ->select(
                    'er.id',
                    'req.username as editor_name',
                    'own.username as owner_name',
                    'p.title as photo_title',
                    'p.filename',
                    'er.status as request_status',
                    'et.status as task_status',
                    'er.created_at'
                )
                ->orderByDesc('er.created_at')
                ->get();

            return response()->json([
                'success' => true,
                'requests' => $requests
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error in ' . $e
            ]);
        }
    }
}
