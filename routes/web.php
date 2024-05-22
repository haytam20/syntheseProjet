<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';

Route::get('/test-email', function () {
    $user = \App\Models\User::first(); // Assuming you have a user to send the email to.
    $reservation = \App\Models\Reservation::first(); // Assuming you have a reservation to use.

    Mail::to($user->email)->send(new \App\Mail\ReservationUpdateMail($reservation));

    return 'Email sent';
});
