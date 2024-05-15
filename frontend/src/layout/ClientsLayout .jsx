import { Outlet,useNavigate  } from "react-router-dom";

import React, { useEffect } from 'react';

import Footer from "../assets/footer";
import Navclient from "../assets/navclients";
function ClientsLayout () {
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
      <Navclient/>
      <main>
        <Outlet/>
      </main> 
      <Footer/>
    </>
  );
}

export default ClientsLayout ;
