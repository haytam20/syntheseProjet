<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;

class CartController extends Controller
{
    public function addToCart(Request $request, $productId)
    {
        // Retrieve the product from the database
        $product = Product::findOrFail($productId);

        // Get or create the user's cart
        $cart = Cart::getOrCreateForUser($request->user());

        // Add the product to the cart
        $cartItem = $cart->addProduct($product);

        // Return a response or redirect as needed
    }

    public function updateCartItem(Request $request, $cartItemId)
    {
        // Find the cart item
        $cartItem = CartItem::findOrFail($cartItemId);

        // Update the quantity
        $cartItem->updateQuantity($request->input('quantity'));

        // Return a response or redirect as needed
    }

    public function removeFromCart(Request $request, $cartItemId)
    {
        // Find the cart item
        $cartItem = CartItem::findOrFail($cartItemId);

        // Remove the item from the cart
        $cartItem->delete();

        // Return a response or redirect as needed
    }

    public function getCartContents(Request $request)
    {
        // Get the user's cart
        $cart = Cart::getForUser($request->user());

        // Return the cart contents as a response
        return response()->json($cart->getContents());
    }

    public function checkout(Request $request)
    {
        // Get the user's cart
        $cart = Cart::getForUser($request->user());

        // Process the checkout (e.g., create an order, update inventory, clear the cart)
        $order = $cart->checkout();

        // Return a response or redirect as needed
    }
}