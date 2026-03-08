<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Nette\Utils\Json;

class Home extends Controller
{
    public function getAllPhotos() : JsonResponse
    {
        $photos = Photo::with(['likes','comments'])->get();
        $users = User::all();

        $current_user = Auth::user();

        foreach($photos as $p){
            $p->totalLikes = $p->likes->count();

            if ($current_user){
                $p->isLiked = $p->likes->where('user_id',$current_user->id)->count() > 0;
            }else{
                $p->isLiked = false;
            }

            foreach($p->comments as $c){
                $c->created_at_human = $c->created_at->diffForHumans();
            }
        }
        return response()->json(['success' => true,'photos' => $photos,'current_user' => $current_user,'users' => $users]);
    }
}