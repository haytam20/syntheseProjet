import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Rest of your code...


const ClientHome = () => {
    const [userName, setUserName] = useState("");



    useEffect(() => {
        const storedUserData = localStorage.getItem('ACCESS_TOKEN');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserName(userData.name);
          
        }
    }, []);

  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
            <div className="text-4xl font-bold">
              oRliFix<span className="text-green-700">.</span>
            </div>
            <div>
              <img
                src="https://image.flaticon.com/icons/svg/497/497348.svg"
                alt=""
                className="w-8"
              />
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
              YOUR ONLINE  <span className="text-green-700">PARAPHARMACY</span> 
              
              </h1>
              <div className="w-20 h-2 bg-green-700 my-4"></div>
              <p className="text-xl mb-10">
              Welcome <span className='text-xl text-green-500 font-bold mb-2 text-transform: uppercase'>{userName}</span>! We're delighted to have you here. Don't forget, you can easily reserve your favorite parapharmacy products right from the comfort of your home.
               Explore our wide selection and place your order hassle-free. Need assistance? Our team is here to help! Happy shopping!
              </p>
              <Link to={'/app/product'}>
              <button className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">
                Find Product
              </button>
              </Link>
            </div>
          </header>
        </div>
      </div>
      <img
        src="https://i.pinimg.com/474x/c9/f5/ea/c9f5ea06ed5848185d14414660d966b9.jpg"
        alt="Leafs"
        className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
};

export default ClientHome;