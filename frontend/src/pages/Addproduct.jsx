
import React, { useState, useEffect } from 'react';
import ProductForm from './assetsPage/ProductForm';
import ProductList from './assetsPage/ProductList';

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.reverse()); // Reverse the order to show the newest first
      } else {
        console.error('Failed to fetch products:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleAddProduct = async (newProduct) => {
    const formData = new FormData();
    formData.append('name', newProduct.productName);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('file', newProduct.file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/addproduct', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchProducts(); // Fetch products after adding a new one
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {<div>
        <h2 className="text-2xl mb-4 text-gray-800 bg-gray-50 flex items-center justify-center py-2">Add Product</h2>
        <ProductForm onSubmit={handleAddProduct} />
      </div> }
   
      <div>
      <h2 className="text-2xl mb-4 text-gray-800 bg-gray-50 flex items-center justify-center py-2">Products</h2>


        <ProductList
          products={filteredProducts}
          onSearch={handleSearchChange}
          />
      </div>
    
          </>
  );
};

export default AddProduct;