<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\User;

class UserController extends Controller
{
     /**
     * Get all users
     *
     * @return \Illuminate\Http\Response
     */
    public function getUsers()
    {
        // Fetch all users from the database
        $users = User::all();

        // Return the users as JSON response
        return response()->json(['users' => $users]);
    }
    public function updateUser(Request $request, $id)
{
    // Find the user by ID
    $user = User::find($id);

    // If user not found, return error response
    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    // Validate the request data
    $validatedData = $request->validate([
        'name' => 'nullable|string|max:255',
        'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
        'role' => 'nullable|string|max:255',
    ]);

    // Update user data
    $user->fill($validatedData);
    $user->save();

    // Return a success response
    return response()->json(['message' => 'User updated successfully', 'user' => $user]);
}
    public function deleteUser($id)
    {
        // Find the user by ID
        $user = User::find($id);

        // If user not found, return error response
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete the user
        $user->delete();

        // Return a success response
        return response()->json(['message' => 'User deleted successfully']);
    }
     /**
     * Get a single user by ID
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getUser($id)
    {
        // Find the user by ID
        $user = User::find($id);

        // If user not found, return error response
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Return the user as JSON response
        return response()->json(['user' => $user]);
    }
}
