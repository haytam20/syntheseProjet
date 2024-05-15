import React, { useState } from 'react';

function SearchBar({ searchTerm, onSearchChange, onPriceFilterChange }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    const newMinPrice = e.target.value;
    setMinPrice(newMinPrice);
    onPriceFilterChange(e, 'min'); // Pass the event object and filter type
  };

  const handleMaxPriceChange = (e) => {
    const newMaxPrice = e.target.value;
    setMaxPrice(newMaxPrice);
    onPriceFilterChange(e, 'max'); // Pass the event object and filter type
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle search
  };


  return (
    <form onSubmit={handleSearchSubmit}>
      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full rounded-none border-none py-3 px-4 pl-10 pr-32 focus:outline-none focus:ring-0"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Price min"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="bg-gray-200 outline-none placeholder-gray-500 text-gray-700 rounded-l-lg px-4 py-2"
            />
            <input
              type="number"
              placeholder="Price max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="bg-gray-200 outline-none placeholder-gray-500 text-gray-700 rounded-r-lg px-4 py-2"
            />
            <button
            
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-r-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
