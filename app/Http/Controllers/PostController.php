<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Faker\Provider\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Expr\Cast\Array_;

class PostController extends Controller
{
    public function getAllPosts() {
        return Inertia::render('Users/Posts', [
            'title' => 'Posts',
            'posts' => Post::orderByDesc('created_at')->paginate(5),
        ]);
    }

    public function getUserPosts() {
        
        return Inertia::render('Users/Posts', [
            'title' => 'My Posts',
            'posts' => Post::where('user_id', auth()->user()->id)->orderByDesc('created_at')->paginate(5)
        ]);
    }

    public function getUserPost(int $post_id) {
        return Inertia::render('Users/Posts', [
            'title' => 'Post',
            'posts' =>  Post::where('post_id', $post_id)->get(),
            'comments' => Comment::where('post_id')
        ]);
    }


    public function createPost(string $title, Image $image, Request $request){
        Post::create($request->validated()); 
        return redirect('/user/posts');
    }
}