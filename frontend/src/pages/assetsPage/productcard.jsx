import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from '../CartContext';

const ProductCard = ({ product, handleReturnClick }) => {
  const { addToCart } = useCart();
  const [showMessage, setShowMessage] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    if (accessToken) {
      setUserRole(accessToken.role);
    }
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    handleReturnClick();
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto flex flex-wrap justify-between w-[900px] h-[600px] bg-white p-5 relative">
      <div className="imgBx w-1/2 h-full flex justify-center items-center relative transition-all duration-300">
        <button
          style={{ position: "absolute", top: "-40px", left: "-40px" }}
          onClick={handleClick}
          className="absolute top-4 left-4 text-white hover:text-gray-300 bg-gray-500 hover:bg-gray-600 p-2 rounded-full"
        >
          <FaArrowLeft className="h-6 w-6" />
        </button>
        <img
          src={`http://127.0.0.1:8000/${product.file_path}`}
          alt={product.name}
          className="max-w-xs md:max-w-sm m-auto rounded-lg shadow-lg"
        />
        <span className="absolute top-0 left-6 text-5xl font-extrabold opacity-10 uppercase">Orlifix</span>
      </div>
      <div className="details w-1/2 h-full flex justify-center items-center p-10 box-border">
        <div className="content">
          <button onClick={handleClick} className="text-white hover:text-gray-300 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="w-20 h-1 bg-white dark:bg-white mb-6"></span>
          <h2 className="text-4xl font-black leading-tight text-[#444] mb-4">
            {product.name} <br />
            <span className="text-sm uppercase tracking-wider text-[#999]">Running Collection</span>
          </h2>
          <p className="text-sm text-[#333] mb-8 max-w-[85%] ml-[15%]">{product.description}</p>
          <div className="flex items-center mb-8">
            <label htmlFor="qty" className="text-sm text-[#333] mr-4">
              Qty:
            </label>
            <input
              type="number"
              id="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              min="1"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <h3 className="text-5xl text-[#a2a2a2] float-left">{product.price} DH</h3>
          {userRole !== 'admin' && (
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-5 py-3 m-2 text-sm uppercase tracking-wider font-semibold rounded-3xl float-right"
            >
              Add to cart
            </button>
          )}
          {showMessage && (
            <div className="fixed top-1 left-4 bg-green-500 text-white p-4 rounded">Item added to cart successfully!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;