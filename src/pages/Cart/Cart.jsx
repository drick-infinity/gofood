import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart,  getTotalCartAmount ,url} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
      <div className="hidden md:grid grid-cols-5 gap-4 border-b pb-2 font-semibold text-gray-600">
        <p className="col-span-1">Item</p>
        <p className="col-span-1">Title</p>
        <p className="col-span-1">Price</p>
        <p className="col-span-1">Quantity</p>
        <p className="col-span-1">Total</p>
      </div>
      {food_list.map((item) => {
        if (!item || !cartItems[item._id]) return null; 
        if (cartItems[item._id] > 0) {
          return (
            <div
              key={item._id}
              className="grid grid-cols-5 gap-4 items-center border-b py-4"
            >
              {/* Item Image */}
              <div className="col-span-1">
                <img
                  src={url+"/images/"+item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded-lg"
                />
              </div>

              {/* Item Title */}
              <p className="col-span-1 font-medium text-gray-700">{item.name}</p>

              {/* Price */}
              <p className="col-span-1 text-gray-600">Rs.{item.price}</p>

              {/* Quantity */}
              <p className="col-span-1 text-gray-600">{cartItems[item._id]}</p>

              {/* Total and Remove Button */}
              <div className="col-span-1 flex items-center justify-between">
                <p className="text-gray-700 font-semibold">
                  Rs.{item.price * cartItems[item._id]}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                >
                  X
                </button>
              </div>
            </div>
          );
        }
        return null;
      })}

      <div className="flex justify-between space-x-10 mt-10">
        {/* Cart Totals Section */}
        <div className="p-6 w-full md:w-3/4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Totals</h2>
          <div className="space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between border-b pb-2">
              <p className="text-gray-600 text-lg">SubTotal</p>
              <p className="text-gray-800 font-medium text-lg"> Rs.{getTotalCartAmount()}</p>
            </div>

            {/* Delivery Fee */} 
            <div className="flex justify-between border-b pb-2">
              <p className="text-gray-600 text-lg">Delivery Fee</p>
              <p className="text-gray-800 font-medium text-lg">Rs.{getTotalCartAmount()===0?0:2}</p>
            </div>

            {/* Total */}
            <div className="flex justify-between font-semibold text-xl">
              <p className="text-gray-700">TOTAL</p>
              <p className="text-gray-900">Rs.{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>

          {/* Checkout Button */}
          <button onClick={()=>navigate('/order')} className="mt-6 w-full bg-slate-800 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-slate-600 transition duration-300">
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="w-full p-6">
          <h2 className="text-sm text-gray-700 mb-4">If you have a promo code, Enter it here</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button className="bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-600 transition duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
