import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const ProductSlider = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true, 
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 3, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 class="text-gray-700 poppins text-3xl justify-center text-center text-transform: uppercase; "> Last product   <span class="text-green-300 font-semibold select-none text-transform: uppercase;">  added </span></h1>
      <Slider {...settings} className="py-6">
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/register`}>
              <img src={`http://127.0.0.1:8000/${product.file_path}`} alt={product.name} className="w-full" />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
