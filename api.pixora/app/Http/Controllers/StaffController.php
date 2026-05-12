<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    public function getStaff()
    {
        $user = Auth::user();
        try{
            if ($user->role !== 'admin'){
                return response()->json([
                    'success' => false,
                    'message' => 'You dont have a permission for show the staff of Pixora platform'
                ]);
            }
    
            $staff = DB::table('users')->select('id','email','username','role','created_at')->where('id','<>',$user->id)->whereIn('role',['admin','editor'])->get();
            return response()->json([
                'success' => true,
                'staff' => $staff
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Error in ' . $e
            ]);
        }
    }
}
