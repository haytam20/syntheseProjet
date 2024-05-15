<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
class AuthController extends Controller
{
    /**
     * Handle the registration request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Create a new user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // Return a success response
        return response()->json(['message' => 'Registration successful'], 201);
    }

    /**
     * Handle the login request.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
    
        // Attempt to authenticate the user
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            // Authentication successful
            $user = Auth::user();
            $id = $user->id; // Get the user's role
            $role = $user->role; // Get the user's role
            $name = $user->name; // Get the user's role
            $email = $user->email; // Get the user's role
    
            return response()->json([
                'message' => 'Login successful',

                'id' => $id, // Include the role in the response
                'name' => $name, // Include the role in the response
                'role' => $role, // Include the role in the response
                'email' => $email, // Include the role in the response
              
            ]);
        } else {
            // Authentication failed
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }
   /**
     * Send a password reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sendResetPasswordLink(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'email' => 'required|email',
        ]);

        // Send the password reset link
        $status = Password::sendResetLink(
            $validatedData['email']
        );

        // Return the response based on the status
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Password reset link sent to your email address.'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unable to send password reset link.'
            ], 500);
        }
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function resetPassword(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        // Reset the password
        $status = Password::reset(
            $validatedData,
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->save();

                $user->setRememberToken(Str::random(60));
            }
        );

        // Return the response based on the status
        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Password reset successful.'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Unable to reset password.'
            ], 500);
        }
    }

    }
