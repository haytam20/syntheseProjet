import React, { useState, useEffect } from 'react';
import EditProductForm from './EditeProductForm'; 
import ConfirmModal from './confirmdeleteModal'; 

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editProduct, setEditProduct] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5); // Number of products per page

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).reverse();

    // Pagination Logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEditClick = (product) => {
        setEditProduct(product);
    };

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${updatedProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                const updatedProducts = products.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
                setProducts(updatedProducts);
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteClick = (productId) => {
        setDeleteProductId(productId);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/products/${deleteProductId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedProducts = products.filter((product) => product.id !== deleteProductId);
                setProducts(updatedProducts);
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDeleteProductId(null);
            setShowConfirmModal(false);
        }
    };

    const handleCloseEditForm = () => {
        setEditProduct(null);
    };

    const handleCancelDelete = () => {
        setDeleteProductId(null);
        setShowConfirmModal(false);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id={`checkbox-table-${product.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor={`checkbox-table-${product.id}`} className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.id}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.name}
                            </td>
                            <td className="px-6 py-4">
                                {product.price}
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    onClick={() => handleEditClick(product)}
                                >
                                    Edit
                                </a>
                                <a
                                    href="#"
                                    className="ml-4 font-medium text-red-600 dark:text-red-500 hover:underline"
                                    onClick={() => handleDeleteClick(product.id)}
                                >
                                    Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => paginate(i + 1)}
                                    className={`px-3 py-1 rounded-full focus:outline-none ${
                                        currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            {editProduct && (
                <EditProductForm
                    product={editProduct}
                    onUpdate={handleUpdateProduct}
                    onClose={handleCloseEditForm}
                />
            )}
            {showConfirmModal && (
                <ConfirmModal
                    message="Are you sure you want to delete this product?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default ProductTable;
