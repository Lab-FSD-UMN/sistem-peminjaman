<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class APIAuthController extends Controller
{
    public function login(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password' => 'required',
            ], [
                'email.required' => 'Email must not be empty.',
                'password.required' => 'Password must not be empty.',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed.',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $user = User::where('email', $request->email)
                // ->where('role', 'user')
                ->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    "message" => "Invalid credentials."
                ], 401);
            }

            $token = $user->createToken('users')->plainTextToken;

            return response()->json([
                "message" => "Successfully logged in.",
                "token" => $token,
                "user" => $user
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "message" => $e->getMessage(),
            ], 500);
        }
    }


    public function logout()
    {
        try {
            $user = auth()->user();
            $user->tokens()->delete();

            return response()->json([
                "message" => "Successfully logged out."
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "message" => $e->getMessage(),
            ], 500);
        }
    }


    public function register(Request $request)
    {

        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            event(new Registered($user));

            $token = $user->createToken('users')->plainTextToken;

            return response()->json([
                "message" => "Successfully registered.",
                "token" => $token,
                "user" => $user
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function updateFCMToken(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'fcm_token' => 'required',
            ], [
                'fcm_token.required' => 'FCM token must not be empty.',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed.',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $user = auth()->user();
            $user->fcm_token = $request->fcm_token;
            $user->save();

            return response()->json([
                "message" => "Successfully updated FCM token.",
                "code" => 200,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => $e->getMessage(),
                "message" => "Failed to update FCM token.",
                "code" => 422,
            ], 422);
        }
    }
}
