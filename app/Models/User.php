<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifications\SendNotif;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Ramsey\Uuid\Uuid;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'email',
        'password',
        'fcm_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    // protected static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($model) {
    //         $model->id = Uuid::uuid4()->toString();
    //     });
    // }

    protected function role(): Attribute
    {
        return new Attribute(
            get: fn ($value) => ["user", "admin"][$value]
        );
    }



    // public function fcm_token()
    // {
    //     // $token_test = "eZoVVP58QbeXnJbqupHtY3:APA91bGU7JxfCrk5LAXMsF8vXD3Jz4GSv-bUCEMpVP97lWqywMNhWkSUR97CU00aCd2SZITrXEKCZvZZQeNKbvgGZ7-9pmQKEOULkd0ygR3B9tlTfGSJFpXTSZpnWzT3IRrKrBwtOIJw";
    //     // return $token_test;
    //     //return fcm token from database
    //     return $this->
    // }


    // public function fcm_token()
    // {
    //     return $this->fcm_token;
    // }

    public function routeNotificationForFcm()
    {
        // $token_test = "eZoVVP58QbeXnJbqupHtY3:APA91bGU7JxfCrk5LAXMsF8vXD3Jz4GSv-bUCEMpVP97lWqywMNhWkSUR97CU00aCd2SZITrXEKCZvZZQeNKbvgGZ7-9pmQKEOULkd0ygR3B9tlTfGSJFpXTSZpnWzT3IRrKrBwtOIJw";
        // return $token_test;
        return $this->fcm_token;
    }
}
