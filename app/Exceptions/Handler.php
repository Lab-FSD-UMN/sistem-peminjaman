<?php

namespace App\Exceptions;

use App\Exceptions\CustomException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // $this->reportable(function (Throwable $e) {
        //     //
        // });
        // $this->reportable(function (CustomException $e) {
        //     return $e->report("Custom error message");
        // });
        // $this->renderable(function (ReservationException $e) {
        //     // return $e->render("Custom error message");
        //     return response()->json([
        //         'message' => $e->getMessage(),
        //     ], $e->getCode());
        // });
    }


    public function render($request, Throwable $exception)
    {
        if ($exception instanceof AuthenticationException) {
            if ($request->wantsJson()) { // header (Accept : application/json)
                return response()->json([
                    'message' => 'Unauthenticated'
                ], 401);
            }
            return redirect()->guest(route('login'));
        }

        return parent::render($request, $exception);
    }



}
