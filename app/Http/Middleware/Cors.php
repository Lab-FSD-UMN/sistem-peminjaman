<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Credentials', config('cors.supports_credentials'))
            ->header('Access-Control-Allow-Origin', config('cors.allowed_origins'))
            ->header('Access-Control-Allow-Methods', config('cors.allowed_methods'))
            ->header('Access-Control-Allow-Headers', config('cors.allowed_headers'));
    }
}
