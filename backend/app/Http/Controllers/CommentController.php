<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'photo_id' => ['required','exists:photos,id'],
            'comment' => ['required','string']
        ]);

        if ($request->comment === ""){
            return response()->json([
                'success' => false,
                'message' => 'Comment can not be a empty'
            ]);
        }

        $photo_id = $request->photo_id;
        $content = $request->comment;
        $user = Auth::user();
        if (!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ]);
        }

        $comment = new Comment();
        $comment->photo_id = $photo_id;
        $comment->content = $content;
        $comment->user_id = $user->id;
        $comment->save();
        return response()->json([
            'success' => true,
            'message' => 'Comment added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
