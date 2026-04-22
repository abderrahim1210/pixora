<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FetchUsers extends Controller
{
    public function getUsers($type)
    {
        try{
            $users = User::select('id','username','display_name','photo_profile')->where('role','user')->get();
            $top_users = DB::table('users as u')->join('photos as p','u.id','=','p.user_id')->select('u.id','u.username','u.photo_profile',DB::raw('COUNT(p.id) as totalUploads'))
            ->where('u.role','=','user')
            ->groupBy('u.id','u.username','u.photo_profile')
            ->orderBy('totalUploads','desc')
            ->limit(3)
            ->get();

            $featured_artists = DB::table('users as u')->join('photos as p','u.id','=','p.user_id')->select('u.id','u.username','u.photo_profile')->where('p.is_featured','=',true)->limit(5)->get();
            if ($type === "top_photographers"){
                return response()->json(['success' => true,'users' => $top_users]);
            }else if($type === "featured_artists"){
                return response()->json(['success' => true,'users' => $featured_artists]);
            }else{
                return response()->json(['success' => true,'users' => $users]);
            }
        }catch(\Exception $e){
            return response()->json(['message' => 'Error in '.$e]);
        }
    }
}
