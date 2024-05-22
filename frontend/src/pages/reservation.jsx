import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Fetch reservations from the server
    fetchReservations();

    // Update the date every second
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleAcceptReservation = async (reservationId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/reservations/${reservationId}/accept`);
      console.log(response.data.message);
      fetchReservations(); // Fetch updated reservations after accepting
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  const handleRejectReservation = async (reservationId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/reservations/${reservationId}/reject`);
      console.log(response.data.message);
      fetchReservations(); // Fetch updated reservations after rejecting
    } catch (error) {
      console.error('Error rejecting reservation:', error);
    }
  };

  return (
    <>
      <div className="relative py-10 overflow-x-auto shadow-md sm:rounded-lg">
        <p className="text-gray-800 text-lg mb-4">
          Current Date: {currentDate.toLocaleString()}
        </p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                user ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-40 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
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
                <td className="px-6 py-4 m-6 flex justify-center">
                  <button
                    className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-md mr-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={() => handleAcceptReservation(reservation.id)}
                  >
                    Accept Reservation
                  </button>
                  <button
                    className="bg-gray-700 hover:bg-red-500 text-white px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => handleRejectReservation(reservation.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reservation;