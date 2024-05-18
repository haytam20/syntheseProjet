import React, { useState } from 'react';
import './cartproduct.css';

function SearchBar({ products, onSearchChange, onPriceFilterChange }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    const newMinPrice = e.target.value;
    setMinPrice(newMinPrice);
    onPriceFilterChange(newMinPrice, maxPrice);
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = e.target.value;
    setMaxPrice(newMaxPrice);
    onPriceFilterChange(minPrice, newMaxPrice);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle search
  };

  return (
    <>
      <div className="  flex flex-col justify-center">
        <div className="relative p-12 w-full sm:max-w-2xl sm:mx-auto">
          <div className="overflow-hidden z-0 rounded-full relative p-3">
            <form role="form" className="relative flex z-50 bg-white rounded-full" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="enter your search here"
                className="rounded-full flex-1 px-6 py-4 text-gray-700 focus:outline-none"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="bg-[#083752] text-white rounded-full font-semibold px-8 py-4 hover:bg-gray-700 focus:bg-[#083752] focus:outline-none">
                Search
              </button>
            </form>
            <div className="glow glow-1 z-10 bg-green-100 absolute"></div>
            <div className="glow glow-2 z-20 bg-green-200 absolute"></div>
            <div className="glow glow-3 z-30 bg-green-300 absolute"></div>
            <div className="glow glow-4 z-40 bg-green-400 absolute"></div>
          </div>
        </div>
        {/* <div className="flex justify-center my-4">
          <div className="mx-2">
            <label htmlFor="minPrice" className="block text-gray-700 font-bold mb-2">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </div>
          <div className="mx-2">
            <label htmlFor="maxPrice" className="block text-gray-700 font-bold mb-2">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default SearchBar;