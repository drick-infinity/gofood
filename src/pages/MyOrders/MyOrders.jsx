import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from '../../context/StoreContext';
import axios from 'axios';
import {assets} from '../../assets/frontend_assets/assets';
const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrders = async()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        // console.log(response.data.data)
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

  return (
    <div className="px-10 py-14">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h2>
  <div className="space-y-6">
    {data.length > 0 ? (
      data.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-md border border-gray-200 hover:shadow-lg transition-shadow p-4"
        >
          {/* Icon */}
          <img
            src={assets.parcel_icon}
            alt="Parcel Icon"
            className="w-16 h-16 mb-4 md:mb-0 md:mr-4"
          />

          {/* Order Details */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg font-medium text-slate-800">
              Items:{" "}
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return `${item.name} x${item.quantity}`;
                } else {
                  return `${item.name} x${item.quantity}, `;
                }
              })}
            </p>
            <p className="text-gray-500 mt-2">Total: ₹{order.amount}</p>
            <p className="text-gray-500">Total Items: {order.items.length}</p>
            <p
              className={`text-sm font-bold mt-2 ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : "text-orange-600"
              }`}
            >
              <span className="text-lg">&#x25cf;</span> {order.status}
            </p>
          </div>

          {/* Track Order Button */}
          <button
            className="mt-4 md:mt-0 md:ml-4 bg-slate-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-600 transition-colors"
            onClick={fetchOrders}
          >
            Track Order
          </button>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No orders found.</p>
    )}
  </div>
</div>


  )
}

export default MyOrders