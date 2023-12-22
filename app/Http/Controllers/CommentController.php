<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function getUserComments($post_id){
        return Comment::where('user_id', auth()->user()->id)->where('post_id', $post_id)->orderByDesc('created_at')->paginate(5);
    }


    public function getAllComments($post_id){
        return Comment::where('post_id', $post_id)->orderByDesc('created_at')->paginate(5);
    }


    public function createComment($content, $post_id){
        Comment::create([
            'user_id' => auth()->user()->id,
            'post_id' => $post_id,
            'content' => $content
        ]);
        return redirect('/posts'.'/'.$post_id);#TODO
    }
}
