import React from 'react';
import { assets } from '../../assets/admin_assets/assets';

const Navbar = () => {

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center mt-4">
        <img width="200px" height="20px" src={assets.gofood} alt="Logo"/>
        </div>
        <div className="hidden md:block">
          <img
            src={assets.profile_image}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
