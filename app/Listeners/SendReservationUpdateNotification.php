<?php

namespace App\Listeners;

use App\Events\ReservationUpdated;
use App\Mail\ReservationUpdateMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendReservationUpdateNotification implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\ReservationUpdated  $event
     * @return void
     */
    public function handle(ReservationUpdated $event)
    {
        $reservation = $event->reservation;
        $user = $reservation->user;

        Mail::to($user->email)
            ->send(new ReservationUpdateMail($reservation));
    }
}