import React, { useState, useEffect } from 'react';
import SearchBar from './assetsPage/searchbar';
import ProductPage from './assetsPage/productcard';

function Product() {
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: null, max: null });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userRole, setUserRole] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://127.0.0.1:8000/api/products');
        const data = await result.json();
        setProducts(data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    // Get user role from local storage
    const userData = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    setUserRole(userData.role);
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const toggleExpandProduct = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  const handlePriceFilterChange = (e, type) => {
    const value = e.target.value === '' ? null : parseFloat(e.target.value);
    setPriceFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch =
      (priceFilter.min === null || product.price >= priceFilter.min) &&
      (priceFilter.max === null || product.price <= priceFilter.max);
    return nameMatch && priceMatch;
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleReturnToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white"> 
      {selectedProduct ? (
        <ProductPage
          product={selectedProduct}
          handleReturnClick={handleReturnToProducts}
        />
      ) : (
        <>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onPriceFilterChange={handlePriceFilterChange}
          />

          <div className="flex mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="w-72 bg-green-500 hover:bg-green-400 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <a href="#">
                  <img
                    src={`http://127.0.0.1:8000/${product.file_path}`}
                    alt="Product"
                    className="h-80 w-72 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-72">
                    <span className="text-teal-800 mr-3 uppercase text-xs">Brand</span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {truncateText(product.name, 20)}
                    </p>
                    <p className="text-lg text-black truncate block capitalize">
                      {truncateText(product.description, 20)}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">{product.price} DH</p>
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">1{product.price} DH</p>
                      </del>
                      {userRole !== 'admin' && ( 
                        <div className="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-bag-plus"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                            />
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
