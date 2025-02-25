import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const Header = () => {
  // State to control when the animation starts
  const [animate, setAnimate] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true); // Trigger the animation after a delay
    }, 500); // Wait for 500ms before starting the animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col justify-center items-center gap-x-8 gap-y-3 xl:gap-10 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full ${animate ? 'animate-fadeIn animate-scaleUp' : ''}`}>
            <div className="w-full lg:w-1/2">
              <img
                src={assets.header_img}
                alt="header section"
                className="w-full h-auto rounded-xl lg:h-[400px] object-cover delay-[300ms] duration-[600ms] taos:translate-y-[-100%] taos:opacity-0" data-taos-offset="500 "
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-xl">
                <div className="mb-4 lg:mb-8">
                  <h2 className="text-4xl text-center font-medium text-slate-800 mb-2 lg:text-left animate-typing overflow-hidden whitespace-nowrap">
                    Order Favourite Food Here....
                  </h2>
                  <h4 className="text-center text-lg text-gray-400 leading-[1.75rem] mb-4 lg:text-left">
                    Hungry? We've got you covered ! Browse through a world of flavors, order your favorite dishes, and have them delivered hot and fresh to your door. Enjoy a hassle-free, delicious experience anytime!<br />
                  </h4>
                  <div className='mt-5'>
                    {/* Hover effect for scaling */}
                    <a href="/fooddisplay" className="relative z-10 inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md group ring-offset-2 ring-1 ring-indigo-300 hover:ring-offset-indigo-500 ease focus:outline-none animate-bounce">
                      <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
                      <span className="relative z-20 flex items-center text-lg">Order Now</span>
                    </a>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header
