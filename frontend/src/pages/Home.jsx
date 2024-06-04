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
        <>
            <section className="container flex flex-col items-center px-6 py-12 mx-auto lg:flex-row">
                <div className="lg:w-1/2">
                <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                    Orlifix <span className="text-green-400 ">vous accueille</span>
                  </h2>
                 <p className="max-w-lg mt-4 text-gray-500"> Bienvenue chez Orlifix, votre destination incontournable pour des produits de santé et de bien-être de haute qualité. Chez Orlifix, nous proposons une sélection soigneusement sélectionnée de produits de soins de la peau, de beauté, d'hygiène et de bien-être pour vous aider à vous sentir et à être à votre meilleur au quotidien.</p>
                    <div className="mt-6 sm:flex sm:items-center">
                        <Link to={'/register'} className="bg-green-500 hover:bg-green-500/80 duration-300 transition-colors border-2 border-green-500 px-6 block text-center py-3 uppercase text-sm font-bold leading-4 tracking-widest text-white">
                            Get started
                        </Link>
                        <Link  to={"/login"} className="border-2 text-sm duration-300 transition-colors hover:bg-green-500 hover:text-white font-bold leading-4 mt-4 sm:mt-0 tracking-widest text-green-500 sm:mx-4 border-green-500 px-6 block text-center py-3 uppercase">
                            login
                        </Link>
                    </div>
                </div>
                <div className="h-[38rem] mt-12 lg:mt-0 w-full mx-auto max-w-md overflow-hidden rounded-t-full outline outline-4 outline-offset-4 outline-green-500/40">
                    <img className="object-cover w-full h-full rounded-t-full" src="https://i.pinimg.com/564x/89/87/1c/89871cd68284b6a5d86fa556af8c89aa.jpg" alt="main page" />
                </div>
            </section>
                <ProductSlider products={products.slice(0, 10)} />

            <section className="bg-green-300 mt-12">
                <div className="container flex flex-col px-6 py-16 mx-auto mt-12">
                    <div className="order-2 mt-8 lg:order-1 lg:mt-0 lg:flex lg:items-center lg:-mx-6">
                        <img className="object-cover w-full lg:w-1/2 lg:mx-6 h-72 lg:h-96" src="https://i.pinimg.com/564x/96/1c/b3/961cb37ee94baf65bf039b6f824599cb.jpg" alt="" />
                        <div className="mt-8 lg:w-1/2 lg:mx-6 lg:mt-0">
                            <h3 className="font-serif text-2xl text-white capitalize md:text-4xl lg:text-5xl">Discover Orlifix</h3>
                            <p className="mt-4 text-gray-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, nisi fugiat dicta impedit sed quisquam quas veritatis consectetur neque saepe, autem facilis dolore officiis minima explicabo perferendis ab porro magnam!</p>
                            <Link to={"/about"} className="inline-flex px-6 py-3 mt-6 text-white border-2 border-white hover:bg-green-400 duration-300 transition-colors" href="#">
                                About us
                            </Link>
                        </div>
                    </div>
                    {/* <img className="order-1 object-cover lg:order-2 w-ful h-72 lg:h-96 lg:mt-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_xLBxp3NSEDkKj592r2FPgZHHfurPk1o8Bg&s" alt="" /> */}
                </div>
            </section>

            {/* <section className="container px-6 py-12 mx-auto lg:py-16">
                <h3 className="font-serif text-3xl text-green-500 capitalize md:text-4xl lg:text-5xl">News & Updates</h3>
                <div className="mt-8 xl:-mx-6 xl:flex">
                    <div className="xl:w-1/2 xl:mx-6">
                        <img className="object-cover w-full h-96" src="https://images.unsplash.com/photo-1626838524909-7c584c2266f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="" />
                        <h2 className="mt-6 font-serif text-3xl font-medium text-gray-700">Plants Around Us</h2>
                        <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nuncLorem ipsum dolor sit.Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        <p className="mt-4 italic text-gray-600">December 23, 2021</p>
                    </div>
                    <div className="mt-8 space-y-8 xl:w-1/2 xl:mx-6 xl:mt-0">
                        <div className="md:-mx-4 md:flex md:items-center">
                            <img className="object-cover w-full h-56 md:h-48 md:mx-4 md:w-80 shrink-0" src="https://images.unsplash.com/photo-1556426356-0fdc8b663467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1498&q=80" alt="" />
                            <div className="mt-6 md:mx-4 md:mt-0">
                                <h2 className="font-serif text-2xl font-medium text-gray-700">Lush Gardens</h2>
                                <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nuncLorem ipsum dolor sit...</p>
                                <p className="mt-4 italic text-gray-600">December 16, 2021</p>
                            </div>
                        </div>
                        <div className="md:-mx-4 md:flex md:items-center">
                            <img className="object-cover w-full h-56 md:h-48 md:mx-4 md:w-80 shrink-0" src="https://images.unsplash.com/photo-1583470790878-4f4f3811a01f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" alt="" />
                            <div className="mt-6 md:mx-4 md:mt-0">
                                <h2 className="font-serif text-2xl font-medium text-gray-700">Exotic Nature</h2>
                                <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nuncLorem ipsum dolor sit...</p>
                                <p className="mt-4 italic text-gray-600">November 11, 2021</p>
                            </div>
                        </div>
                        <div className="md:-mx-4 md:flex md:items-center">
                            <img className="object-cover w-full h-56 md:h-48 md:mx-4 md:w-80 shrink-0" src="https://images.unsplash.com/photo-1638790491374-a2affccd8c8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
                            <div className="mt-6 md:mx-4 md:mt-0">
                                <h2 className="font-serif text-2xl font-medium text-gray-700">Botanical Insights</h2>
                                <p className="mt-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt facilisis nuncLorem ipsum dolor sit...</p>
                                <p className="mt-4 italic text-gray-600">October 29, 2021</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default Home;
