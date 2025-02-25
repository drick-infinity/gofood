import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);
  const itemCount = cartItems[id] || 0; // Get current count for this item

  return (
    <>
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-70">
        <div className="relative h-50 m-2.5 overflow-hidden rounded-md">
          <img src={url+"/images/"+image} alt="card-image" className="w-full h-auto" />
          {!itemCount ? (
            <img
              onClick={() => addToCart(id)} // Add item to cart
              src={assets.add_icon_white}
              className="cursor-pointer absolute bottom-2 right-2 h-10"
              alt="Add icon"
            />
          ) : (
            <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-white rounded-md p-1">
              <img
                className="cursor-pointer h-6"
                onClick={() => removeFromCart(id)} // Remove item
                src={assets.remove_icon_red}
                alt="Remove icon"
              />
              <p className="text-sm font-medium">{itemCount}</p>
              <img
                className="cursor-pointer h-6"
                onClick={() => addToCart(id)} // Add item
                src={assets.add_icon_green}
                alt="Add icon"
              />
            </div>
          )}
        </div>
        <div className="p-4">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">{name}</h6>
          <img src={assets.rating_starts} alt="Rating stars" />
          <p className="text-slate-600 leading-normal font-light">{description}</p>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2">
          <div className="rounded-md bg-slate-800 py-2 px-4 text-center text-sm text-white shadow-md hover:bg-slate-700">
            <p>Rs.{price}</p>
          </div>
          <div>
          <button className="rounded-md w-full mt-2 bg-slate-800 py-2 px-4 text-center text-sm text-white shadow-md hover:bg-slate-700">
            Add To Cart
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
