import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import Footer from "../assets/footer";
import Navadmin from "../assets/navadmin";

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (!accessToken) {
      // User is not authenticated, redirect to the login page
      navigate('/login');
    } else {
      const data = JSON.parse(accessToken);
      const role = data.role;
      if (role !== 'admin') {
        // User is not an admin, redirect to the appropriate layout
        navigate('/app');
      }
    }
  }, [navigate]);

  return (
    <>
      <Navadmin />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AdminLayout;