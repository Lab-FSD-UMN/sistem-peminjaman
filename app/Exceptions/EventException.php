<?php

namespace App\Exceptions;

use Exception;

class EventException extends Exception
{

    public static function notFound(): self
    {
        return new static(
            "The event post is not found.",
            404
        );
    }

    public static function custom($message, $code): self
    {
        return new static($message, $code);
    }

}
