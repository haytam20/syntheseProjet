<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReservationUpdateMail extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;

    /**
     * Create a new message instance.
     *
     * @param  \App\Models\Reservation  $reservation
     * @return void
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $status = $this->reservation->is_accepted ? 'accepted' : 'rejected';

        return $this->subject("Your reservation has been {$status}")
                    ->view('emails.reservation_update')
                    ->with([
                        'reservation' => $this->reservation,
                        'status' => $status,
                    ]);
    }
}