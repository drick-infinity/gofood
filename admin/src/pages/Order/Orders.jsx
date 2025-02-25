import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import {assets} from "../../assets/admin_assets/assets"

const Orders = ({url}) => {
  
  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () =>{
    const response = await axios.get(url+"/api/order/list");
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }else{
      toast.error("Error")
    }

  }

  const statusHandler = async (event,orderId)=>{
    const response = await axios.post(url+"/api/order/status",{
        orderId,
        status:event.target.value
    })
    if(response.data.success){
        await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold text-gray-700 mb-7">Order Page</h3>
        <div>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">No orders available</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                >
                  <img
                    src={assets.parcel_icon}
                    alt="Parcel Icon"
                    className="w-16 h-16 mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div className="flex-1">
                    <p className="text-gray-600 font-medium">
                      {order.items.map((item, idx) =>
                        `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? '' : ', '}`
                      )}
                    </p>
                    <p className="text-gray-600 font-small">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-gray-500">
                      {order.address.street}, {order.address.city}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center mt-4 sm:mt-0">
                    <p className="text-gray-600 font-medium mr-6">Items: {order.items.length}</p>
                    <p className="text-gray-600 font-medium mr-6">Rs. {order.amount}</p>
                    <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="p-2 border rounded-md bg-white text-gray-700 hover:border-slate-800">
  <option value="Food Processing" className="hover:bg-slate-800 hover:text-white">Food Processing</option>
  <option value="Out for Delivery" className="hover:bg-slate-800 hover:text-white">Out for Delivery</option>
  <option value="Delivered" className="hover:bg-slate-800 hover:text-white">Delivered</option>
</select>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

      )
}

export default Orders