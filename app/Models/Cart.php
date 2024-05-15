<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    /**
     * Get the cart items for the cart.
     */
    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Get the user associated with the cart.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Add a product to the cart.
     *
     * @param \App\Models\Product $product
     * @param int $quantity
     * @return \App\Models\CartItem
     */
    public function addProduct(Product $product, $quantity = 1)
    {
        $cartItem = $this->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cartItem = $this->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
            ]);
        }

        return $cartItem;
    }

    /**
     * Remove a product from the cart.
     *
     * @param \App\Models\Product $product
     */
    public function removeProduct(Product $product)
    {
        $cartItem = $this->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->delete();
        }
    }

    /**
     * Get the total price of the cart.
     *
     * @return float
     */
    public function getTotalPrice()
    {
        $total = 0;

        foreach ($this->items as $item) {
            $total += $item->product->price * $item->quantity;
        }

        return $total;
    }
}