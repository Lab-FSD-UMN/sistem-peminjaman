<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class Role
{
    // untuk menghandle beberapa role
    public function handle(Request $request, Closure $next, $role): Response
    {
        // if (Auth::check() && Auth::user()->role == $role) {
        //     return $next($request);
        // } else {
        //     return redirect()->route('login');
        // }
        if (Auth::check() && Auth::user()->role == $role) {
            return $next($request);
        }
        if (Auth::check() && Auth::user()->role == 'admin') {
            return redirect()->route('dashboard');
        }
        if (Auth::check() && Auth::user()->role == 'user') {
            return redirect()->route('home');
        }
    }
}
