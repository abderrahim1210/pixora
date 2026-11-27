<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        /** @var \Laravel\Socialite\Two\GoogleProvider $driver */
        $driver = Socialite::driver('google');
        return $driver->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            /** @var \Laravel\Socialite\Two\GoogleProvider $driver */
            $driver = Socialite::driver('google');
            $googleUser = $driver->stateless()->user();

            $user = User::where('email', $googleUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'username' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'password' => bcrypt(Str::random(16))
                ]);
            }

            Auth::login($user);

            return redirect(rtrim((string) config('app.frontend_url'), '/') . '/');
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'get_class' => get_class($e),
                'message' => "Error : " . $e->getMessage()
            ], 401);
        }
    }
}
