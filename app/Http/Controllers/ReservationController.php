<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Notifications\ReservationStatusNotification;
use Illuminate\Http\Request;
use App\Events\ReservationUpdated;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::whereNull('is_accepted')->get();
        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'cartItems' => 'required|array',
            'cartItems.*.user_id' => 'required|integer|exists:users,id',
            'cartItems.*.name' => 'required|string|max:255',
            'cartItems.*.price' => 'required|numeric',
            'cartItems.*.description' => 'nullable|string',
            'cartItems.*.qty' => 'required|integer',
            'cartItems.*.file_path' => 'required|string',
            'cartItems.*.is_accepted' => 'nullable|boolean',
        ]);

        foreach ($validatedData['cartItems'] as $item) {
            Reservation::create([
                'user_id' => $item['user_id'],
                'product_name' => $item['name'],
                'product_price' => $item['price'],
                'product_description' => $item['description'],
                'product_qty' => $item['qty'],
                'file_path' => $item['file_path'],
                'is_accepted' => $item['is_accepted'] ?? null,
            ]);
        }

        return response()->json(['message' => 'Reservation successful!'], 201);
    }

    public function acceptReservation($reservationId)
    {
        $reservation = Reservation::findOrFail($reservationId);
        $reservation->is_accepted = true;
        $reservation->status = 'accepted';
        $reservation->save();

        event(new ReservationUpdated($reservation));

        // Notify user
        $reservation->user->notify(new ReservationStatusNotification($reservation, 'accepted'));

        return response()->json(['message' => 'Reservation accepted!']);
    }

    public function rejectReservation($reservationId)
    {
        $reservation = Reservation::findOrFail($reservationId);
        $reservation->is_accepted = false;
        $reservation->status = 'rejected';
        $reservation->save();

        event(new ReservationUpdated($reservation));

        // Notify user
        $reservation->user->notify(new ReservationStatusNotification($reservation, 'rejected'));

        return response()->json(['message' => 'Reservation rejected!']);
    }
    public function history()
    {
        $reservations = Reservation::where('status', '!=', 'pending')->get();
        return response()->json($reservations);
    }
    public function Allreservation()
    {
        // Fetch all users from the database
        $Reservation = Reservation::all();

        // Return the users as JSON response
        return response()->json(['Reservation' => $Reservation]);
    }
}
