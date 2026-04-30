<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Photo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileAnalytics extends Controller
{
    public function analytics()
    {
        $user = Auth::user();

        $nicheAnalysis = Photo::where('user_id', $user->id)->join('categories','photos.category_id','=','categories.id')->select('photos.category_id','categories.name as cat_name', DB::raw('(SELECT AVG(likes_per_photo) FROM (
            SELECT COUNT(likes.id) as likes_per_photo 
            FROM photos p 
            LEFT JOIN likes ON p.id = likes.photo_id 
            WHERE p.category_id = category_id 
            GROUP BY p.id
        ) as subquery) as engagement'))->groupBy('photos.category_id','categories.name')->orderBy('engagement', 'desc')->get();

        $totalFollowers = Follow::where('following_id', $user->id)->count();

        $audienceReach = DB::table('users')->join('follows', 'users.id', '=', 'follows.follower_id')
            ->where('follows.following_id', $user->id)
            ->select('users.country', DB::raw('count(*) as count'))
            ->groupBy('users.country')
            ->orderBy('count', 'desc')
            ->take(3)
            ->get()
            ->map(function ($item) use ($totalFollowers) {
                return [
                    'country' => $item->country ?? 'Unknown',
                    'percentage' => $totalFollowers > 0 ? round(($item->count / $totalFollowers) * 100) : 0
                ];
            });

        $totalLikes = Photo::where('photos.user_id',$user->id)->join('likes','photos.id','=','likes.photo_id')->count();

        $engagementScore = $totalFollowers > 0 ? round(($totalLikes / $totalFollowers), 1) : 0;

        $last7DaysUploads = Photo::where('photos.user_id',$user->id)
        ->where('created_at','>=',Carbon::now()->subDays(7))
        ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
        ->groupBy('date')
        ->orderBy('date','asc')
        ->get()
        ->pluck('count','date');

        $chartData = [];
        for ($i = 6;$i >= 0;$i--){
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $chartData[] = [
                'day' => Carbon::now()->subDays($i)->format('D'),
                'count' => $last7DaysUploads[$date] ?? 0
            ];
        }

        return response()->json([
            'nicheAnalysis' => $nicheAnalysis,
            'audienReach' => $audienceReach,
            'engagementScore' => $engagementScore,
            'topLocation' => $audienceReach->first()['country'] ?? 'N/A',
            'chartData' => $chartData
        ]);
    }
}
