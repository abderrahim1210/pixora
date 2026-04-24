<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchAtPhotos extends Controller
{
    public function getResult(Request $request)
    {
        $searchTerme = $request->query('terme');

        if (empty($searchTerme)) {
            return response()->json([
                'success' => true,
                'result' => []
            ]);
        }

        try {
            $result = DB::table('photos as p')->join('users', 'p.user_id', '=', 'users.id')->join('categories as c','p.category_id','=','c.id')->select('p.id', 'p.title', 'p.filename', 'p.is_featured')->where(function ($query) use ($searchTerme) {
                $query->where('p.title', 'LIKE', "%{$searchTerme}%")->orWhere('p.tags', 'LIKE', "%{$searchTerme}%")->orWhere('p.description', 'LIKE', "%{$searchTerme}%")->orWhere('c.name','LIKE',"%{$searchTerme}%");
            })->limit(40)->get();

            return response()->json([
                'success' => true,
                'result' => $result
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error in ' . $e]);
        }
    }
}
