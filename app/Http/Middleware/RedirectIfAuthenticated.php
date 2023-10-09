<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        // foreach ($guards as $guard) {
        //     if (Auth::guard($guard)->check()) {
        //         return redirect(RouteServiceProvider::HOME);
        //     }
        // }
        // Set the default redirect path for admin and non-admin users
        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // Check if the authenticated user is an admin
                if (Auth::user()->role_id == 1) {
                    return redirect('/admin');
                }

                // If not an admin, redirect to home
                return redirect('/');
            }
        }

        return $next($request);
    }
}
