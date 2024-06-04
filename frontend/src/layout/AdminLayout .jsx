import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import Footer from '../assets/footer';
import axios from 'axios';

function AdminLayout() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (!accessToken) {
      navigate('/login');
    } else {
      const data = JSON.parse(accessToken);
      const role = data.role;
      const name = data.name;
      if (role !== 'admin') {
        navigate('/app');
      } else {
        setName(name);
      }
    }
    fetchReservations(); // Initial fetch
    const intervalId = setInterval(fetchReservations, 30000); // Fetch reservations every 30 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [navigate]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/reservations');
      const filteredReservations = response.data.filter(reservation => reservation.is_accepted === null);
      setReservations(filteredReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    navigate('/login');
  };

  return (
    <>
      <header className="flex items-center justify-between h-20 px-6 bg-white border-b">
        <div className="relative flex items-center">
          <div className="flex space-x-4">
            <Link
              to="/admin"
              className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/admin/dashbord"
              className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/product"
              className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Product Page
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <Link
            to="/admin/reservation"
            className="relative p-2 mx-3 text-gray-400 transition-colors duration-300 rounded-full hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100"
          >
            <span className="sr-only">Notifications</span>
            {reservations && reservations.length > 0 && (
              <>
                <span className="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-blue-700 rounded-full"></span>
                <span className="absolute top-0 right-0 w-2 h-2 mt-1 mr-2 bg-blue-700 rounded-full animate-ping"></span>
              </>
            )}
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </Link>
          <div className="relative">
            <button className="transition-colors duration-300 rounded-lg sm:px-4 sm:py-2 focus:outline-none hover:bg-gray-100" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="sr-only">User Menu</span>
              <div className="flex items-center md:-mx-2">
                <div className="hidden md:mx-2 md:flex md:flex-col md:items-end md:leading-tight">
                  <span className="font-semibold text-sm text-gray-800">{name}</span>
                  <span className="text-sm text-gray-600">Admin</span>
                </div>
                <img className="flex-shrink-0 w-10 h-10 overflow-hidden bg-gray-100 rounded-full md:mx-2" src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="user profile photo" />
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-50 w-56 p-2 bg-white border rounded-lg top-16 lg:top-20">
                <Link
                  to="/admin/profileinfo"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          {dropdownOpen && <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)}></div>}
          <button onClick={handleLogout} className="p-2 text-gray-400 transition-colors duration-300 rounded-full focus:outline-none hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100">
            <span className="sr-only">Log out</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default AdminLayout;
