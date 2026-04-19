<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminAnlytics extends Controller
{
    public function getStatistics()
    {
        try {
            $stats = DB::selectOne("
                SELECT
                    (SELECT COUNT(*) FROM users) as users_count,
                    (SELECT COUNT(*) FROM photos) as photos_count,
                    (SELECT COUNT(*) FROM edition_requests) as requests_count,
                    (SELECT COUNT(*) FROM comments) as comments_count
            ");

            $top_photographers = DB::table('users as u')
                ->join('photos as p', 'u.id', '=', 'p.user_id')
                ->select('u.id', 'u.username', 'u.photo_profile')
                ->groupBy('u.id', 'u.username', 'u.photo_profile')
                ->limit(5)
                ->get();

            $mostCommented = DB::table('photos as p')
                ->join('comments as c', 'p.id', '=', 'c.photo_id')
                ->select('p.id', DB::raw('COUNT(c.id) as comment_count'), 'p.title', 'p.filename')
                ->groupBy('p.id', 'p.title', 'p.filename')
                ->orderByDesc('comment_count')
                ->limit(4)
                ->get();

            $usersThisMonth = DB::table('users')
                ->whereMonth('created_at', now()->month())
                ->whereYear('created_at', now()->year())
                ->orderByDesc('created_at')
                ->limit(4)
                ->get();

            $most_commentsPhotos = DB::table('photos as p')
                ->select('p.id', 'p.title', 'p.filename', 'p.user_id')
                ->join('comments as c', 'p.id', '=', 'c.photo_id')
                ->groupBy('c.photo_id', 'p.id', 'p.title', 'p.filename', 'p.user_id')
                ->orderBy('c.id')
                ->orderByDesc('c.id')
                ->limit(4)
                ->get();

            $totalEditionRequests = DB::table('edition_requests')->count();

            // $requestsByStatus = DB::table('edition_requests')
            //     ->select('status', DB::raw('COUNT(*) as total'))
            //     ->groupBy('status')
            //     ->get();

            $top_uploaders = DB::table('users as u')
                ->join('photos as p', 'u.id', '=', 'p.user_id')
                ->select(DB::raw('COUNT(p.id) as totalUploads'), 'u.id', 'u.username', 'u.photo_profile')
                ->groupBy('p.user_id', 'u.id', 'u.username', 'u.photo_profile')
                ->orderBy('totalUploads')
                ->orderByDesc('totalUploads')
                ->limit(5)
                ->get();

            $photo_this_week = DB::table('photos')
                ->select('id', 'title', 'filename', 'created_at')
                ->where('created_at', '>=', now()->subDay(7))
                ->limit(4)
                ->get();

            $latestRequests = DB::table('edition_requests as er')
                ->join('users as req', 'er.requester_id', '=', 'req.id') // Editor
                ->join('users as own', 'er.owner_id', '=', 'own.id')      // Photographer
                ->join('photos as p', 'er.image_id', '=', 'p.id')
                ->select(
                    'er.id',
                    'req.username as editor_name',
                    'own.username as owner_name',
                    'p.title as photo_title',
                    'p.filename',
                    'er.status',
                    'er.created_at'
                )
                ->orderByDesc('er.created_at')
                ->limit(5)
                ->get();

            $staff = DB::table('users')
                ->select('id', 'username', 'role')
                ->whereIn('role',['admin','editor'])
                ->limit(5)
                ->get();
            return response()->json([
                'success' => true,
                'data' => [
                    'counters' => [
                        'total_users' => $stats->users_count,
                        'total_photos' => $stats->photos_count,
                        'total_requests' => $stats->requests_count,
                        'total_comments' => $stats->comments_count,
                        'pending_editions' => DB::table('edition_requests')->where('status', 'pending')->count(),
                        'active_tasks' => DB::table('editing_tasks')->where('status', 'in_progress')->count()
                    ],

                    'edition_requests' => $totalEditionRequests,
                    // 'latest_edition_resquests' => $latestRequests,
                    'requests' => $latestRequests,
                    'recent_users' => $usersThisMonth,
                    'top_photographers' => $top_photographers,
                    'most_commented' => $mostCommented,
                    'top_uploaders' => $top_uploaders,
                    'photos_this_week' => $photo_this_week,
                    'most_commentsPhotos' => $most_commentsPhotos,
                    'staff' => $staff
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error in ' . $e->getMessage()
            ]);
        }
    }
}
