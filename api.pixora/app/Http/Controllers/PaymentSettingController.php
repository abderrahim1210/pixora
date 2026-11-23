<?php

namespace App\Http\Controllers;

use App\Models\PaymentSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class PaymentSettingController extends Controller
{
    public function redirectPaypal()
    {
        $clientId = config('services.paypal.client_id');
        $redirectUri = rtrim((string) config('app.url'), '/') . '/auth/paypal/callback';
        $mode = config('services.paypal.mode', 'sandbox');

        $baseUrl = $mode === 'live' ? 'https://www.paypal.com/signin/authorize' : 'https://www.sandbox.paypal.com/signin/authorize';

        $query = http_build_query([
            'client_id' => $clientId,
            'response_type' => 'code',
            'scope' => 'openid email',
            'redirect_uri' => $redirectUri
        ]);

        return redirect($baseUrl . '?' . $query);
    }

    public function handlePayPalCallback(Request $request)
    {
        $code = $request->input('code');
        $user = User::find(Auth::id());
        $frontendUrl = rtrim((string) config('app.frontend_url'), '/');
        if (!$code) {
            return redirect($frontendUrl . "/user/" . $user->username . "/myprofile");
        }

        $clientId = config('services.paypal.client_id');
        $clientSecret = config('services.paypal.client_secret');
        $mode = config('services.paypal.mode', 'sandbox');

        $tokenUrl = $mode === 'live' ? 'https://api-m.paypal.com/v1/oauth2/token' : 'https://api-m.sandbox.paypal.com/v1/oauth2/token';

        $response = Http::withBasicAuth($clientId, $clientSecret)->asForm()->post($tokenUrl, [
            'grant_type' => 'authorization_code',
            'code' => $code,
            'redirect_url' => rtrim((string) config('app.url'), '/') . '/auth/paypal/callback',
        ]);

        if (!$response->successful()) {
            return redirect($frontendUrl . "/user/" . $user->username . "/myprofile");
        }

        $accessToken = $response->json('access_token');
        $userInfoUrl = $mode === 'live'
            ? 'https://api-m.paypal.com/v1/identity/openidconnect/userinfo?schema=openid'
            : 'https://api-m.sandbox.paypal.com/v1/identity/openidconnect/userinfo?schema=openid';

        $userResponse = Http::withToken($accessToken)->get($userInfoUrl);
        $userResponse = Http::withToken($accessToken)->get($userInfoUrl);

        if (!$userResponse->successful()) {
            return redirect($frontendUrl . "/user/" . $user->username . "/myprofile");
        }

        $paypalData = $userResponse->json();
        $verifiedEmail = $paypalData['email'] ?? null;
        $payerId = $paypalData['user_id'] ?? null;


        PaymentSetting::updateOrCreate([
            'user_id' => $user->id,
            'method_type' => 'paypal',
        ], ['credentials' => ['email' => $verifiedEmail, 'payer_id' => $payerId], 'is_default' => true]);

        $user->update([
            'payment_email' => $verifiedEmail
        ]);
        return redirect($frontendUrl . "/user/" . $user->username . "/myprofile");
    }
}
