<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginFormRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginFormRequest $request){
        if(!auth()->attempt($request->validated())){
            return redirect()
                ->route('login');
        }

        return redirect()->route('home');
    }

    public function logout(){
        auth()->logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect()->route('home'); 
    }
}
  