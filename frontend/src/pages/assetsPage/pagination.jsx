import React, { useState } from 'react';

function Pagination ({ currentPage, totalPages, goToPage }) {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{currentPage * 10 - 9}-{Math.min(currentPage * 10, totalPages * 10)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalPages * 10}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button 
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border ${currentPage === 1 ? "border-gray-200" : "border-gray-300"} rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button 
                onClick={() => goToPage(pageNumber)}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${pageNumber === currentPage ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li>
            <button 
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${currentPage === totalPages ? "border-gray-200" : "border-gray-300"} rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  export default Pagination;