import React, { useState,useEffect  } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";


function Dashboard() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [productCount, setProductCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [reservationCount, setReservationCount] = useState(0);
    useEffect(() => {
        // Fetch the product data from the backend
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                // Set the product count based on the response data
                setProductCount(response.data.length);
                
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);
    useEffect(() => {
        // Fetch the user data from the backend
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                // Set the user count based on the response data
                setUserCount(response.data.users.length);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);
    useEffect(() => {
        // Fetch reservation data from the backend
        axios.get('http://localhost:8000/api/allreseravtion')
            .then(response => {
                // Set the reservation count based on the response data
                setReservationCount(response.data.Reservation.length);
            })
            .catch(error => {
                console.error('There was an error fetching the reservations!', error);
            });
    }, []);

    return (
        <>
        
            <main id="content" className="flex-1 pb-12 space-y-6 overflow-y-auto bg-gray-100 lg:h-screen md:space-y-8">
 
                <section className="flex flex-col w-full px-6 md:justify-between md:items-center md:flex-row m-2">
                    <div>
                        <h2 className="text-3xl font-medium text-gray-800">Dashboard</h2>
                        <p className="mt-2 text-sm text-gray-500">Welcome admin</p>
                    </div>
                    <div className="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
                        <button className="px-6 py-3 focus:outline-none text-gray-500 transition-colors duration-300 rounded-lg md:mx-1 hover:bg-gray-400 hover:text-white">
                            <div className="flex items-center justify-center -mx-1">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg> */}
                                {/* <span className="mx-1 text-sm capitalize">Manage dashboard</span> */}
                            </div>
                        </button>
                
                    </div>
                </section>
                <section className="grid grid-cols-1 gap-8 px-6 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2">
                     
                    
                        
                <Link to="/admin/addproduct" className="px-6 py-3 focus:outline-none mt-4 text-white bg-gray-800 rounded-lg md:mt-0 md:mx-1 hover:bg-green-400">
                <div className="flex items-center justify-center -mx-1">
                <AiFillProduct />
                    <span className="mx-1 text-sm capitalize">edit product</span>
                </div>
            </Link>
                        <Link  to={"/admin/users"} className="px-6 py-3 focus:outline-none mt-4 text-white bg-gray-800 rounded-lg md:mt-0 md:mx-1 hover:bg-green-400">
                            <div className="flex items-center justify-center -mx-1">
                            <RiUserSettingsLine/>
                                <span className="mx-1 text-sm capitalize">user</span>
                            </div>
                        </Link>
                        <Link  to={"/admin/history"} className="px-6 py-3 focus:outline-none mt-4 text-white bg-gray-800 rounded-lg md:mt-0 md:mx-1 hover:bg-green-400">
                            <div className="flex items-center justify-center -mx-1">
                            <FaBookOpen />
                                <span className="mx-1 text-sm capitalize">Reservation History</span>
                            </div>
                        </Link>
                        
                    
                    <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                        <div className="flex items-center -mx-2">
                        <MdOutlineProductionQuantityLimits style={{ width: '3rem', height: '3rem' }} />
                            <div className="mx-2">
                                <h2 className="text-xl font-semibold text-gray-800">Number of product</h2>
                                <p className="text-gray-600 text-xl">{productCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                        <div className="flex items-center -mx-2">
                        <FaUsers  style={{ width: '3rem', height: '3rem' }}/>
                            <div className="mx-2">
                                <h2 className="text-xl font-semibold text-gray-800">Number of Users</h2>
                                <p className="text-gray-600 text-xl">{userCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                        <div className="flex items-center -mx-2">
                            <svg className="mx-2" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35 0C15.6714 0 0 15.6714 0 35C0 54.3286 15.6714 70 35 70C54.3286 70 70 54.3286 70 35C70 15.6714 54.3286 0 35 0ZM31.1036 49.7458L18.75 37.5L23.2722 32.8636L31.1036 40.4978L46.7278 24.5908L51.25 29.2722L31.1036 49.7458Z" fill="#34D399" />
                            </svg>
                            <div className="mx-2">
                                <h2 className="text-xl font-semibold text-gray-800">All Reservations</h2>
                                <p className="text-gray-600 text-xl">{reservationCount}</p>
                            </div>
                        </div>
                    </div>
             
                    {/* <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                        <div className="flex items-center -mx-2">
                            <svg className="mx-2" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M55.417 16.0425L53.3333 22.9167L38.5425 16.0425L55.417 16.0425ZM47.7833 35L24.9333 23.625L21.1916 26.0758L29.5 41.7916L35 56.6667L39.6666 46.0833L47.7833 35ZM17.5 50.8333L15.4166 57.7083L7.29163 60.8333L14.1666 52.7083L17.5 50.8333ZM52.7083 14.1667L56.6667 4.66671L66.6667 0L61.9583 9.16671L52.7083 14.1667ZM17.2916 0L16.6666 15.8333L0 29.1667L15.625 23.75L17.2916 0Z" fill="#4B5563" />
                            </svg>
                            <div className="mx-2">
                                <h2 className="text-xl font-semibold text-gray-800">Active Courses</h2>
                                <p className="text-gray-600">12 Courses</p>
                            </div>
                        </div>
                    </div>  */}
                </section>
            </main>
        </>
    );
}

export default Dashboard;
