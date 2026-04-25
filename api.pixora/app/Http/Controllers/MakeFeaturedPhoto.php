<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MakeFeaturedPhoto extends Controller
{
    public function makeFeaturedPhoto($id)
    {
        try{
            $photo = DB::table('photos')->select('id','is_featured')->where('id',$id)->first();
            if ($photo){
                $newStatus = !$photo->is_featured;
                DB::table('photos')->where('id',$id)->update(['is_featured' => $newStatus]);
                return response()->json([
                    'success' => true
                ]);
            }
            return response()->json(['success' => false,'message' => 'Photo not found']);
        }catch(\Exception $e){
            return response()->json(['success' => false,'message' => $e]);
        }
    }
}
