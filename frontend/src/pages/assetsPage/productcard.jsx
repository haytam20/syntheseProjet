import React from 'react';

const Productcard = ({ product, handleReturnClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    handleReturnClick(); 
  };

  return (
    <div className="bg-teal-100 dark:bg-gray-900 flex relative z-20 items-center overflow-hidden">
      <div className="container mx-auto px-6 flex relative py-16 bg-gray-700">
        <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
          <button onClick={handleClick} className="text-white hover:text-gray-300 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="w-20 h-1 bg-white dark:bg-white mb-6"></span>
          <h1 className="font-bebas-neue uppercase text-4xl sm:text-5xl font-black flex flex-col leading-tight dark:text-white text-white mb-4">{product.name}</h1>
          <p className="text-sm sm:text-base text-white dark:text-white mb-8">{product.description}</p>
          <div className="flex mt-8">
            <div className="uppercase py-2 px-4 rounded-lg bg-teal-500 border-2 border-transparent text-white text-md mr-4 shadow-md">
              {product.price} DH
            </div>
          </div>
        </div>
        <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
          <img src={`http://127.0.0.1:8000/${product.file_path}`} alt={product.name} className="max-w-xs md:max-w-sm m-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Productcard;
