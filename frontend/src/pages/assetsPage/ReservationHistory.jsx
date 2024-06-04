import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';

function ReservationHistory() {
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust the number of items per page

  useEffect(() => {
    fetchReservationHistory();
  }, []);

  const fetchReservationHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/reservation-history');
      setHistory(response.data.reverse());
    } catch (error) {
      console.error('Error fetching reservation history:', error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const generateCSV = () => {
    const filteredHistory = history.filter((reservation) =>
      new Date(reservation.created_at).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
    );

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'User ID,Product Name,Description,Qty,Price,Status,Date\n';

    filteredHistory.forEach((reservation) => {
      const row = `${reservation.user_id},${reservation.product_name},${reservation.product_description},${reservation.product_qty},${reservation.product_price},${reservation.status},${new Date(reservation.created_at).toLocaleDateString()}\n`;
      csvContent += row;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'reservation_history.csv');
    document.body.appendChild(link);

    link.click();
  };

  const handleClick = (event) => {
    event.preventDefault();
    handleReturnClick();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(history.length / itemsPerPage);

  return (
    <div className="relative py-10 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between mb-4 m-6">
        <h2 className="text-xl font-bold">Reservation History</h2>
        <Link to="/admin/reservation">
          <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-2 rounded m-5">
            View Pending Reservations
          </button>
        </Link>
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="mr-2 m-2">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border border-gray-300 p-2 rounded"
        />
        <button
          onClick={generateCSV}
          className="ml-2 bg-gray-800 hover:bg-green-500 text-white py-2 px-2 rounded"
        >
          Download CSV
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3 uppercase">User ID</th>
            <th scope="col" className="px-6 py-3">Product Name</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((reservation) => (
            <tr key={reservation.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img
                  src={`http://127.0.0.1:8000/${reservation.file_path}`}
                  className="w-auto h-20 object-cover"
                  alt={reservation.product_name}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {reservation.user_id}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {reservation.product_name}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {reservation.product_description}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {reservation.product_qty}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {reservation.product_price} DH
              </td>
              <td className={`px-6 py-4 font-semibold ${reservation.status === 'accepted' ? 'text-green-500' : reservation.status === 'rejected' ? 'text-red-400' : 'text-gray-900'} dark:text-white`}>
                {reservation.status}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {new Date(reservation.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReservationHistory;
