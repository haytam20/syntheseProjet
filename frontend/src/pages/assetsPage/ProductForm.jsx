import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false); // Add this state variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({ productName, price, description, file });
    setSuccessMessage('Product added successfully!');
    // Reset form fields
    setProductName('');
    setPrice('');
    setDescription('');
    setFile(null);
  };

  useEffect(() => {
    // Clear success message after 3 seconds
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    // Clear timer on component unmount or when successMessage changes
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <div>
      {!showForm && (
        <button
          type="button"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          onClick={() => setShowForm(true)}
        >
          Add Product
        </button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 shadow-lg rounded-md px-8 pt-6 pb-8">
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Add Image
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductForm;