import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductSlider from './assetsPage/ProductSlide';



const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch('http://127.0.0.1:8000/api/products');
        const data = await result.json();
        setProducts(data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row bg-white md:h-screen">
        <div className="flex-1 flex flex-col justify-center items-center md:items-start p-8 md:p-12">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
              Orlifix <span className="text-green-400 ">vous accueille</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Bienvenue chez Orlifix, votre destination incontournable pour des produits de santé et de bien-être de haute qualité. Chez Orlifix, nous proposons une sélection soigneusement sélectionnée de produits de soins de la peau, de beauté, d'hygiène et de bien-être pour vous aider à vous sentir et à être à votre meilleur au quotidien.
            </p>
            <div className="flex justify-center md:justify-start mt-6">
              <Link
                className="px-4 py-3 bg-green-400 text-slate-50 text-xs font-semibold rounded hover:bg-gray-800"
                to="/register"
              >
                Get Started
              </Link>
              {/* <Link className="mx-4 px-4 py-3 bg-green-300 text-slate-50 text-xs font-semibold rounded hover:bg-gray-800" to="/products" > Les Produits </Link> */}
            </div>
          </div>
        </div>
        <div className="flex-1 hidden md:flex">
          <div
            className="h-full w-full object-cover"
            style={{
              clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)',
              backgroundImage: "url('https://i.pinimg.com/564x/89/87/1c/89871cd68284b6a5d86fa556af8c89aa.jpg')",
            }}
          >
            <div className="h-full bg-black opacity-25"></div>
          </div>
        </div>
      </div>
      <ProductSlider products={products.slice(0, 6)} />
    </div>
  );
};

export default Home;