<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;


class CustomException extends Exception
{
    public function report($request)
    {
        // return response()->view('errors.custom', [], 500);
        // just return json
        return response()->json([
            'message' => 'Custom error message',
        ], 500);
    }

    public function render($request)
    {
        return response()->view('errors.custom', [], 500);
    }
}
