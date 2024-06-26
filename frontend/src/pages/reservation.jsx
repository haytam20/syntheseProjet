import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [isRejected, setIsRejected] = useState(false);
  const navigate = useNavigate();
  const [shouldRefetch, setShouldRefetch] = useState(false);
  
  useEffect(() => {
    fetchReservations();
  
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
  
    return () => clearInterval(interval);
  }, [shouldRefetch]);


  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/reservations');
      const filteredReservations = response.data.filter(reservation => reservation.is_accepted === null);
      setReservations(filteredReservations);
      setShouldRefetch(false); // Reset shouldRefetch to false
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
  const handleAcceptReservation = async (reservationId) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/reservations/${reservationId}/accept`);
    setMessage(response.data.message);
    setIsRejected(false);
    setShouldRefetch(true); // Set shouldRefetch to true
  } catch (error) {
    console.error('Error accepting reservation:', error);
  }
};

const handleRejectReservation = async (reservationId) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/reservations/${reservationId}/reject`);
    setMessage(response.data.message);
    setIsRejected(true);
    setShouldRefetch(true); // Set shouldRefetch to true
  } catch (error) {
    console.error('Error rejecting reservation:', error);
  }
};
  return (
    <div className="relative py-10 overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between mb-4 m-6">
        <h2 className="text-xl font-bold">Pending Reservations</h2>
        <Link to="/admin/history">
          <button className="bg-gray-700 hover:bg-green-500 text-white font-bold py-2 px-2 rounded m-5">
            View Reservation History
          </button>
        </Link>
      </div>
      {message && (
        <div
          className={`${
            isRejected ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'
          } px-4 py-3 rounded relative mb-4`}
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 md:px-6 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-4 md:px-6 py-3 uppercase">
                User ID
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-4 md:px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-4 md:px-40 py-3">
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
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {reservation.user_id}
                </td>
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {reservation.product_name}
                </td>
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {reservation.product_description}
                </td>
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {reservation.product_qty}
                </td>
                <td className="px-4 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {reservation.product_price} DH
                </td>
                <td className="px-4 md:px-6 py-10 flex justify-center">
                  <button
                    className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-md mr-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    onClick={() => handleAcceptReservation(reservation.id)}
                  >
                    Accept  Reservation
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

      <Link to="/admin/history" className="text-blue-500 hover:underline mt-4 inline-block">
        View Reservation History
      </Link>
    </div>
  );
}

export default Reservation;
