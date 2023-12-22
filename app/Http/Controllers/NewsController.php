<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsFormRequest;
use App\Http\Requests\NewEditFormRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\News;
use PhpParser\Node\Expr\Cast\Object_;

class NewsController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'title' => 'Users',
            'news' => News::orderByDesc('created_at')->paginate(5)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Create', [
            'title' => 'Users',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NewsFormRequest $request)
    {
        $new = new News();   
        $new->title = $request->input('title');
        $new->content = $request->input('content');
        $new->path = $request->input('path');
        $new->name = $request->file('image')->store('public/images');
        $new->save();
        // News::create($request->validated());
        return redirect()->route('users.index');
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        return Inertia::render('Users/Edit', [
            'title' => 'Users',
            'new' => News::where('id', $id)->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NewEditFormRequest $request, News $new)
    {
        $new->update($request->validated());
        return redirect()->route('users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $user)
    {
        $user->delete();

        return redirect()->back();
    }
}
