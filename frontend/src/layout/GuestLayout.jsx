import React, { useEffect } from 'react';
import { Outlet, useNavigate,Link } from "react-router-dom";

// import Nav from '../assets/nav';
import Footer from '../assets/footer';

function GuestLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      // User is authenticated, redirect to the appropriate layout
      const data = JSON.parse(accessToken);
      const role = data.role; // Get the user's role from the response

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/app');
      }
    } else {
      // User is not authenticated, redirect to the login page
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      {/* <Nav /> */}
      <header className="bg-white">
        <div className="text-slate-700 relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <Link to="/" className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black">
          <div className="flex flex-shrink-0 items-center">
              <img
                className="h-9 w-auto"
                src="https://res.cloudinary.com/dsk59eyve/image/upload/v1715728070/bhjtxiaaywaqya2cgzb8.png"
                alt="Your Company"
              />
            </div>
          </Link>
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label className="absolute top-5 right-7 cursor-pointer md:hidden" htmlFor="navbar-open">
            <span className="sr-only">Toggle Navigation</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <nav aria-label="Header Navigation" className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="font-bold md:mr-12">
                <Link to="/">Home</Link>
              </li>
              <li className="md:mr-12 ">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="md:mr-12 text-green-500 rounded-full border-2 border-green-500 px-6 py-1">
                <Link to="/login">Login</Link>
              </li>
              <Link to="/register">
              
              <li className="md:mr-12">
                <button className="rounded-full border-2 border-green-500 px-6 py-1  transition-colors bg-green-500 text-white">Register</button>
              </li>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}

export default GuestLayout;