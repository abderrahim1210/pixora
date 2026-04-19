<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetHeroImages extends Controller
{
    public function getHeroImages()
    {
        try{
            $photos = DB::table('photos as p')->join('users as u','p.user_id','=','u.id')->where('p.is_featured','=',true)->select('p.id','p.filename','u.username')->inRandomOrder()->first();
        return response()->json([
            'success' => true,
            'photo' => $photos
        ]);
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => "Error in ". $e
            ]);
        }
    }
}
