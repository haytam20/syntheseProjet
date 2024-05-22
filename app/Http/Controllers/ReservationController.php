<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Events\ReservationUpdated;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();
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
        $reservation->save();

        event(new ReservationUpdated($reservation));

        // Additional logic if needed
    }

    public function rejectReservation($reservationId)
    {
        $reservation = Reservation::findOrFail($reservationId);
        $reservation->is_accepted = false;
        $reservation->save();

        event(new ReservationUpdated($reservation));

        // Additional logic if needed
    }
}