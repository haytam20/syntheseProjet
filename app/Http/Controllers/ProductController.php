<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
// use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
public function addProduct(Request $request)
{
    $product = new Product;
    $product->name = $request->input('name');
    $product->price = $request->input('price');
    $product->description = $request->input('description');

    // Handle file upload
    if ($request->hasFile('file')) {
        $file = $request->file('file');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads/products'), $fileName);
        $product->file_path = 'uploads/products/' . $fileName;
    }

    $product->save();

    return $product;
}


// rtyuijihiuguyf

    public function updateProduct(Request $request, $id)
{   
    // Validate the incoming request data
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'description' => 'nullable|string',
    ]);

    // Find the product by ID
    $product = Product::findOrFail($id);

    // Update the product attributes
    $product->name = $validatedData['name'];
    $product->price = $validatedData['price'];
    $product->description = $validatedData['description'];

    // Save the updated product
    $product->save();
    
    return $product;
}


    public function products()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);
        
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
   

    
}
