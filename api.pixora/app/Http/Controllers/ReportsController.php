<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ReportsController extends Controller
{
    public function getAllReports()
    {
        $user = Auth::user();

        try {
            if ($user->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'You dont have a permission for view all reports'
                ]);
            }

            $reports = DB::table('reports as r')->join('users as reporter', 'reporter.id', '=', 'r.user_id')

                ->leftJoin('photos as p', function ($join) {
                    $join->on('p.id', '=', 'r.reportable_id')
                        ->where('r.reportable_type', '=', 'App\Models\Photo');
                })
                ->leftJoin('comments as c', function ($join) {
                    $join->on('c.id', '=', 'r.reportable_id')
                        ->where('r.reportable_type', '=', 'App\Models\Comment');
                })
                ->leftJoin('users as u_target', function ($join) {
                    $join->on('u_target.id', '=', 'r.reportable_id')
                        ->where('r.reportable_type', '=', 'App\Models\User');
                })
                ->select(
                    'r.id',
                    'r.reason',
                    'r.description',
                    'r.status',
                    'r.created_at',
                    'r.reportable_type',
                    'r.reportable_id',
                    'reporter.username as reporter_name',
                    DB::raw('CASE 
            WHEN r.reportable_type LIKE "%Photo%" THEN "Photo Content"
            WHEN r.reportable_type LIKE "%Comment%" THEN "User Comment"
            WHEN r.reportable_type LIKE "%User%" THEN u_target.username
            ELSE "Unknown"
        END as target_name')
                )
                ->orderBy('r.created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'reports' => $reports
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error in ' . $e->getMessage()
            ]);
        }
    }

    public function show($id)
    {
        $user = Auth::user();
        // $report_id = $request->report_id;

        try {
            if ($user->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'You dont have a permission for view this report'
                ]);
            }

            $report = DB::table('reports as r')->join('users as reporter', 'reporter.id', '=', 'r.user_id')
                ->leftJoin('users as u_target', function ($join) {
                    $join->on('u_target.id', '=', 'r.reportable_id')
                        ->where('r.reportable_type', 'like', '%User%');
                })

                ->leftJoin('photos as p_target', function ($join) {
                    $join->on('p_target.id', '=', 'r.reportable_id')
                        ->where('r.reportable_type', 'like', '%Photo%');
                })

                ->leftJoin('comments as c_target', function ($join) {
                    $join->on('c_target.id', '=', 'r.reportable_id')
                        ->where('r.reportable_type', 'like', '%Comment%');
                })
                ->select(
                    'r.*',
                    'reporter.username as reporter_name',
                    DB::raw('CASE 
            WHEN r.reportable_type LIKE "%User%" THEN u_target.username 
            WHEN r.reportable_type LIKE "%Photo%" THEN "Photo Content"
            WHEN r.reportable_type LIKE "%Comment%" THEN "User Comment"
            ELSE "Unknown"
        END as target_name'),

                    'p_target.filename as photo_url',
                    'c_target.content as comment_body'
                )->where('r.id', '=', $id)->first();

            return response()->json([
                'success' => true,
                'report' => $report
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error in ' . $e->getMessage()
            ]);
        }
    }

    public function reportActions(Request $request)
    {
        $user = Auth::user();

        try {
            if ($user->role !== 'admin') {
                return response()->json([
                    'success' => false,
                    'message' => 'You dont have a permission for manage reports'
                ]);
            }

            $type = $request->type;
            $report_id = $request->report_id;
            $report = Report::find($report_id);
            if (!$report) {
                return response()->json([
                    'success' => false,
                    'message' => 'Report by this id not exist'
                ]);
            }
            switch ($type) {
                case 'resolved':
                    $report->update(['status' => 'resolved']);
                    $msg = 'Report marked as safe and resolved';
                    break;
                case 'delete_photo':
                    DB::beginTransaction();
                    try {
                        $photo = Photo::find($request->reportableId);

                        if ($photo) {
                            $edited_images = DB::table('images')->where('parent_id', $photo->id)->get();

                            foreach ($edited_images as $img) {
                                $relative_path = "edited_images/" . $img->path;

                                if (Storage::disk('public')->exists($relative_path)) {
                                    Storage::disk('public')->delete($relative_path);
                                } else {
                                    if (Storage::disk('public')->exists($img->path)) {
                                        Storage::disk('public')->delete($img->path);
                                    }
                                }

                                DB::table('editing_tasks')->where('request_id', $img->request_id)->delete();

                                DB::table('images')->where('id', $img->id)->delete();
                            }

                            DB::table('edition_requests')->where('image_id', $photo->id)->delete();

                            if ($photo->filename) {
                                $original_path = "photos/" . $photo->filename;
                                if (Storage::disk('public')->exists($original_path)) {
                                    Storage::disk('public')->delete($original_path);
                                }
                            }

                            $photo->delete();
                            $report->update(['status' => 'resolved']);

                            DB::commit();
                            $msg = 'Photo, edited versions, tasks and requests deleted successfully';
                        } else {
                            throw new \Exception("Photo not found in database");
                        }
                    } catch (\Exception $e) {
                        DB::rollBack();
                        return response()->json([
                            'success' => false,
                            'message' => 'Error: ' . $e->getMessage()
                        ], 500);
                    }
                    break;
                case 'delete_comment':
                    DB::beginTransaction();
                    try {
                        $comment = DB::table('comments')->where('id', $request->reportableId)->first();
                        if ($comment) {
                            DB::table('comments')->where('id',$request->reportableId)->delete();
                            $report->update(['status' => 'resolved']);
                            DB::commit();
                            $msg = 'Comment deleted successfully';
                        } else {
                            throw new \Exception("Comment not found in database");
                        }
                    } catch (\Exception $e) {
                        DB::rollBack();
                        return response()->json([
                            'success' => false,
                            'message' => 'Error in ' . $e->getMessage()
                        ]);
                    }
                    break;
                case 'bann_user':
                    DB::beginTransaction();
                    try{
                        $user = User::find($request->reportableId);
                        if ($user){
                            $user->update(['status' => 'banned']);
                            $report->update(['status' => 'resolved']);
                            DB::commit();
                            $msg = 'User banned successfully';
                        }else {
                            throw new \Exception("User not found in database");
                        }
                    }catch(\Exception $e){
                        DB::rollBack();
                        return response()->json([
                            'success' => false,
                            'message' => 'Error in ' . $e->getMessage()
                        ]);
                    }
                    break;
                default:
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid action type'
                    ], 400);
            };
            return response()->json([
                'success' => true,
                'message' => $msg
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error in ' . $e->getMessage()
            ]);
        }
    }
}
