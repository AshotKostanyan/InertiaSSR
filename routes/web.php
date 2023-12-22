<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\PostController;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NewsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('test', function(){
    Inertia::render('Posts');
});


Route::middleware('auth')
    ->group(function () {

        Route::get('/', [IndexController::class, 'index'])->name('home');
        Route::get('/about', [IndexController::class, 'about'])->name('about');

        Route::resource('users', UserController::class);
        // Route::resource('users', NewsController::class);
});

Route::controller(AuthController::class)
    ->group(function () {
    Route::post('/login', 'login')->name('login')->middleware('guest');
    Route::delete('/logout', 'logout')->name('logout')->middleware('auth');
});


// Route::get('/user/post/{post_id}', [PostController::class, 'getUserPost'])->middleware('auth')->name('getuserpost');
// Route::get('/user/posts', [PostController::class, 'getUserPosts'])->middleware('auth')->name('getalluserposts');
// Route::get('/posts', [PostController::class, 'getAllPosts'])->middleware('auth')->name('getallposts');
// Route::post('/user/post/create', [PostController::class, 'createPost'])->middleware('auth')->name('createpost');
// Route::post('/user/post/createcomment', [CommentController::class, 'createComment'])->middleware('auth')->name('createpost');


Route::inertia('/login', 'Login');

// //---register routes--------
// Route::get('register', [RegisterController::class, 'create'])->middleware('guest');
// Route::post('register', [RegisterController::class, 'store'])->middleware('guest');

// Route::get('login', [SessionController::class, 'create'])->middleware('guest');
// Route::post('login', [SessionController::class, 'store'])->middleware('guest');
// Route::get('logout', [SessionController::class, 'destroy'])->middleware('auth');
//  // ------------------------
