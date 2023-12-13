<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class ResponseException extends HttpException
{
    public function __construct($statusCode, $message = "")
    {
        parent::__construct($statusCode, $message);
    }
}
