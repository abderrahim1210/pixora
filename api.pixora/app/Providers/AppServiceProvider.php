<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
        //     return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        // });
        ResetPassword::createUrlUsing(function ($user, string $token) {
            // Had l-URL houwa li ghadi i-koun f l-bouton dyal l-email
            return 'https://www.pixora.test/reset-password?token=' . $token . '&email=' . $user->email;
        });
    }
}
