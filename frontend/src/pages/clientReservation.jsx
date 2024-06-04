import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

function ClientReservation() {
  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const userData = JSON.parse(localStorage.getItem('ACCESS_TOKEN')); // Fetch the user ID from localStorage

  useEffect(() => {
    fetchReservationHistory();
  }, []);

  const fetchReservationHistory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/reservation-history');
      // Reverse the array to show the latest reservations at the top
      setHistory(response.data.reverse());
    } catch (error) {
      console.error('Error fetching reservation history:', error);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const generateCSV = () => {
    let csvContent = 'User ID,Product Name,Description,Qty,Price,Status,Date\n';

    const filteredHistory = history
      .filter((reservation) => reservation.user_id === userData.id) // Filter by user ID
      .map((reservation) => {
        const row = `${reservation.user_id},${reservation.product_name},${reservation.product_description},${reservation.product_qty},${reservation.product_price},${reservation.status},${
          new Date(reservation.created_at).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
            ? new Date(reservation.created_at).toLocaleDateString()
            : ''
        }\n`;
        return row;
      })
      .join('');

    csvContent += filteredHistory;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'reservation_history.csv');
  };

  return (
    <div className="relative py-10 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between mb-4 m-6">
        <h2 className="text-xl font-bold">Reservation History</h2>
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
          {history
            .filter((reservation) => reservation.user_id === userData.id) // Filter by user ID
            .map((reservation) => (
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
    </div>
  );
}

export default ClientReservation;
