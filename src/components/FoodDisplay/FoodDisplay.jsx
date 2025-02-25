import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState(category || "All");

  if (!food_list || food_list.length === 0) {
    return <p className="text-center text-gray-500">Loading dishes...</p>;
  }

  // Filter food_list based on the selected category
  const filteredFoodList = food_list.filter((item) => {
    return selectedCategory === "All" || selectedCategory === item.category;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
      <h2 className="text-slate-800 font-medium text-3xl mb-3">Top dishes near by me</h2>
      <p className="text-center text-[16px] text-gray-400 leading-[1.25rem] mb-4 lg:text-left">
        Discover a world of possibilities as you explore our curated collections. Dive deep into unique experiences, uncover hidden gems, and embark on new adventures. Whether you're looking to expand your knowledge or find something inspiring, there's always more to explore.
      </p>

      {/* Filter Dropdown */}
      <div className="mb-1">
        <label htmlFor="category" className="text-sm text-slate-800 mr-2">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md text-slate-800"
        >
          <option value="All">All</option>
          {/* Dynamically generate options for all unique categories */}
          {Array.from(new Set(food_list.map(item => item.category))).map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Display the filtered food items */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No dishes found in this category</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
