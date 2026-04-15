<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FetchUsers extends Controller
{
    public function getUsers()
    {
        try{
            $users = User::select('id','username','photo_profile')->get();
            return response()->json(['success' => true,'users' => $users]);
        }catch(\Exception $e){
            return response()->json(['message' => 'Error in '.$e]);
        }
    }
}
