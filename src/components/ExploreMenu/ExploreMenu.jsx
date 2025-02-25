import React from 'react';
import { menu_list } from '../../assets/frontend_assets/assets';
import './index.css';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-slate-800 font-medium text-3xl mb-3">Explore Menu</h2>
      <p className="text-center text-[16px] text-gray-400 leading-[1.25rem] mb-4 lg:text-left">
        Discover a world of possibilities as you explore our curated collections. Dive deep into unique experiences, uncover hidden gems, and embark on new adventures. Whether you're looking to expand your knowledge or find something inspiring, there's always more to explore.
      </p>
      <div className="flex overflow-x-auto scrollbar-hide gap-1">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
            }
            className={`flex-shrink-0 flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer ${
              category === item.menu_name
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-transparent'
            }`}
          >
            <img
              className="h-auto max-w-full object-contain"
              src={item.menu_image}
              alt="menu image"
            />
            <p className="text-center mt-2">{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
