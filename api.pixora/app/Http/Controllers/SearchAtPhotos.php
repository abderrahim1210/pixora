<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SearchAtPhotos extends Controller
{
    public function getResult(Request $request)
    {
        $searchTerme = $request->query('terme');

        $type = $request->query('type');

        try {
            $query = DB::table('photos as p')->join('users', 'p.user_id', '=', 'users.id')->join('categories as c', 'p.category_id', '=', 'c.id')->select('p.id', 'p.title', 'p.filename', 'p.is_featured');

            if (!empty($searchTerme)) {
                $exists = DB::table('search_terms')->where('term', $searchTerme)->exists();
                if (!$exists) {
                    DB::table('search_terms')->insert(['term' => $searchTerme, 'last_searched' => now() ,'created_at' => now()]);
                }else{
                    DB::table('search_terms')->where('term',$searchTerme)->update(['last_searched' => now(), 'updated_at' => now()]);
                    DB::table('search_terms')->where('term',$searchTerme)->increment('search_count',1);
                }
                $query->where(function ($q) use ($searchTerme) {
                    $q->where('p.title', 'LIKE', "%{$searchTerme}%")->orWhere('p.tags', 'LIKE', "%{$searchTerme}%")->orWhere('p.description', 'LIKE', "%{$searchTerme}%")->orWhere('c.name', 'LIKE', "%{$searchTerme}%");
                });
            }
            if ($type === 'popular') {
                $query->where('p.is_featured', true)->inRandomOrder();
            } elseif ($type === 'trending') {
                $query->orderBy('p.id', 'desc');
            }

            if (empty($searchTerme) && empty($type)) {
                $query->latest('p.created_at');
            }

            $result = $query->limit(40)->get();

            return response()->json([
                'success' => true,
                'result' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error in ' . $e]);
        }
    }
}
