<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],
    //firebase
    // 'fcm' => [
    //     'key' => env('FCM_KEY'),
    //     'sender_id' => env('FCM_SENDER_ID'),
    //     'server_key' => env('FCM_SERVER_KEY'),
    //     'client_id' => env('FCM_CLIENT_ID'),
    //     'client_secret' => env('FCM_CLIENT_SECRET'),
    //     'access_token' => env('FCM_ACCESS_TOKEN'),
    //     'refresh_token' => env('FCM_REFRESH_TOKEN'),
    // ],
];
