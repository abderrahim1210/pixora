<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchTerms extends Controller
{
    public function search(Request $request) {
        $term = $request->query('term');
        try{
            $suggestions = DB::table('search_terms')->where('term','LIKE',"%$term%")->orderBy('search_count','desc')->limit(5)->get();
            return response()->json([
                'success' => true,
                'suggestions' => $suggestions
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}
