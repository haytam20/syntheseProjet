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
              <h1 className="text-4xl lg:text-6xl font-bold">Welcome, <span className='text-4xl text-green-500 font-bold mb-2 text-transform: uppercase'>{userName}</span>
              </h1>
              <h3></h3>
               <span className="text-green-500 text-2xl font-bold"><br />Admin</span> 
              
              <div className="w-20 h-2 bg-green-500 my-4"></div>
              {/* <p className="text-xl mb-10">
              "Ready to expand our lineup? Click that 'Add Product' button to bring some fresh additions to our catalog!"
              </p> */}
              <Link to={'/admin/addproduct'}>
              <button className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded shadow">
                Add Product
              </button>
              </Link>
            </div>
          </header>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        alt="Leafs"
        className="w-full h-48 object-cover sm:h-screen sm:w-4/12"
      />
    </div>
  );
};

export default ClientHome;