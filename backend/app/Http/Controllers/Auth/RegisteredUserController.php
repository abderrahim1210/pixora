<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Js;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            // 'display_name' => ['string', 'max:50'],
            // 'gender' => ['in:male,female'],
            // 'birth_date' => ['date','before:today'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'username' => strtolower(str_replace(' ','',$request->username)). '_' . uniqid(),
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
            'display_name' => $request->display_name,
            'country' => $request->country,
            'phone_number' => $request->phone_number,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->json([
            'success' => true,
            'message' => 'User registred successsfully',
        ]);
    }
}
