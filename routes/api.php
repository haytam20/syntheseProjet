<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\NotificationController;
// use App\Http\Controllers\NotificationController;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });



// Route for user registration
Route::post('/register', [AuthController::class, 'register']);
// Route for user login
Route::post('/login', [AuthController::class, 'login']);
Route::post('/addproduct', [ProductController::class, 'addProduct']);
Route::get('/products', [ProductController::class, 'products']);
Route::put('/products/{id}', [ProductController::class, 'updateProduct']);
Route::get('/users', [UserController::class, 'getUsers']);
Route::put('/users/{id}', [UserController::class, 'updateUser']);
Route::delete('users/{id}', [UserController::class, 'deleteUser']);
Route::delete('/products/{id}', [ProductController::class, 'deleteProduct']);
Route::get('/profile', [AuthController::class, 'getUserProfile']);
Route::get('/user/{id}', [UserController::class, 'getUser']);
// Password Reset Routes
Route::post('/password/reset-link', [PasswordResetLinkController::class, 'store']);


// routes/api.php
Route::get('/reservations', [ReservationController::class, 'index']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::put('/reservations/{reservationId}/accept', [ReservationController::class, 'acceptReservation']);
Route::put('/reservations/{reservationId}/reject', [ReservationController::class, 'rejectReservation']);
Route::get('/reservation-history', [ReservationController::class, 'history']);
Route::get('/allreseravtion', [ReservationController::class, 'Allreservation']);
// Route::get('/user/notifications', [NotificationController::class, 'index']);
// Route::put('/user/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
// Route::put('/user/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

