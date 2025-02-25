import React, { useState, useContext, useRef } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import VoiceNavigation from '../VoiceNavigation/VoiceNavigation';
const Navbar = ({setShowLogin}) => {
  const { getTotalCartAmount,token,setToken} = useContext(StoreContext); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  // const [isListening,setIsListening] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabChange = (tab) =>{
    setActiveTab(tab);
    setIsMenuOpen(false);
  }

  const navigate = useNavigate();
  const voiceNavigationRef=useRef();
  const logout = () =>{
      localStorage.removeItem("token");
      setToken(""); 
      navigate("/");
  }


  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        {/* Logo */}
        <Link to='/' className="font-bold leading-none" href="#">
         <img width="200px" height="10px" src={assets.logo} alt="Logo" />
        </Link>

        {/* Hamburger Button for Mobile */}
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-[#ff914d] p-3"
            onClick={handleMenuToggle}
          >
            <img className='w-8 h-10 cursor-pointer' src={assets.menu_burger}></img>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <a className={`text-lg ${activeTab === 'home' ? 'text-[#ed813f] border-b-2' : 'text-gray-400 hover:text-[#ed813f]'}`}
            href="/" onClick={()=> handleTabChange('home')}>Home</a>
          </li>
          <li>
            <a className={`text-lg ${activeTab === 'menu' ? 'text-[#ed813f] border-b-2' : 'text-gray-400 hover:text-[#ed813f]'}`}
              href="/menu"
              onClick={() => handleTabChange('menu')}>Menu</a>
          </li>
          <li>
            <a className={`text-lg ${activeTab === 'contact' ? 'text-[#ed813f] border-b-2' : 'text-gray-400 hover:text-[#ed813f]'}`}
              href="/contactus"
              onClick={() => handleTabChange('contact')}>Contact</a>
          </li>
        </ul>

        {/* Icons and Sign In Button */}
        <div className="hidden lg:flex items-center space-x-4">
  
  <Link to="/cart">
    <img className="w-6 h-6 cursor-pointer" src={assets.bag_icon} alt="Cart" />
  </Link>
  <button onClick={() => voiceNavigationRef.current.startListening()} className="px-3 py-1 rounded-full flex items-center space-x-2">
  <img className="w-7 h-7 cursor-pointer" src={assets.user_voice} alt="Voice" />
  </button>
  {!token ? (
    <button
      className="relative z-30 inline-flex items-center justify-center px-4 py-3 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md group ring-offset-2 ring-1 ring-indigo-300 hover:ring-offset-indigo-500 ease focus:outline-none"
      onClick={() => setShowLogin(true)}
    >
      <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
      <span className="relative z-20 flex items-center text-sm">Sign In</span>
    </button>
  ) : (
    <div className="relative group">
    <img
      src={assets.profile_icon}
      alt="Profile Icon"
      className="w-7 h-7 rounded-full cursor-pointer hover:shadow-md"
    />
  
  
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 ease-in-out">
      <ul className="py-2">
        
        <li onClick={()=> navigate('/myorders')} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <img
            src={assets.bag_icon}
            alt="Bag Icon"
            className="w-5 h-5 mr-3"
          />
          <p className="text-sm text-gray-700">Orders</p>
        </li>
        <hr className="border-gray-200" />
       
        <li onClick={logout} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <img
            src={assets.logout_icon}
            alt="Logout Icon"
            className="w-5 h-5 mr-3"
          />
          <p className="text-sm text-gray-700">Logout</p>
        </li>
      </ul>
    </div>
  </div>
  
  )}
</div>

      </nav>

      {/* Mobile Menu */}
      <div className={`navbar-menu fixed inset-0 z-50 ${isMenuOpen ? '' : 'hidden'}`}>
        {/* Backdrop */}
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" onClick={handleMenuToggle}></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <img width="200px" height="10px" src={assets.logo} alt="Logo" />
            </a>
            <button className="navbar-close" onClick={handleMenuToggle}>
              <img src={assets.cross_icon}></img>
            </button>
          </div>
          <ul>
            <li className="mb-1">
              <a className={`block p-4 text-lg font-semibold rounded ${
                  activeTab === 'home' ? 'bg-[#ff914d] text-white' : 'text-gray-400 hover:bg-[#ff914d] hover:text-white'
                }`}
                href="#"
                onClick={() => handleTabChange('home')}>Home</a>
              
            </li>
            <li className="mb-1">
              <a className={`block p-4 text-lg font-semibold rounded ${
                  activeTab === 'menu' ? 'bg-[#ff914d] text-white' : 'text-gray-400 hover:bg-[#ff914d] hover:text-white'
                }`}
                href="#"
                onClick={() => handleTabChange('menu')}>Menu</a>
            </li>
            <li className="mb-1">
              <a className={`block p-4 text-lg font-semibold rounded ${
                  activeTab === 'contact' ? 'bg-[#ff914d] text-white' : 'text-gray-400 hover:bg-[#ff914d] hover:text-white'
                }`}
                href="#"
                onClick={() => handleTabChange('contact')}>Contact Us</a>
            </li>
          </ul>
          <div className="mt-auto pt-6">
          <a href="#_" className="relative z-30 w-full inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md group ring-offset-2 ring-1 ring-indigo-300 hover:ring-offset-indigo-500 ease focus:outline-none">
          <span className="absolute top-0 left-0 h-8 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
          <span onClick={()=>setShowLogin(true)} className="relative z-20 flex items-center text-lg">Sign In</span>
          </a>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2024</span>
            </p>
          </div>
          <VoiceNavigation ref={voiceNavigationRef} />
        </nav>
      </div>
    </>
  );
};

export default Navbar;
