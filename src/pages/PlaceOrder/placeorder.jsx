import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount ,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  useEffect(()=>{
    console.log(data);
  },[data])

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
   let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,
   }
   let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
   if(response.data.success){
    const {session_url} = response.data;
    window.location.replace(session_url);
   }
   else{
    alert("Error");
   }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <div className="container mx-auto p-6">
      <form onSubmit={placeOrder} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Delivery Form */}
        <div className="p-6">
          <p className="text-2xl font-semibold mb-6 text-gray-800">
            Delivery Information
          </p>
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
              type="text"
              placeholder="First Name"
              className="border p-2 rounded-md w-full"
            />
            <input required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
              type="text"
              placeholder="Last Name"
              className="border p-2 rounded-md w-full"
            />

            {/* Email Address - Full Width */}
            <div className="col-span-2">
              <input required
              name="email"
              value={data.email}
              onChange={onChangeHandler}
                type="email"
                placeholder="Email address"
                className="border p-2 rounded-md w-full"
              />
            </div>

            {/* Street - Full Width */}
            <div className="col-span-2">
              <input required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
                type="text"
                placeholder="Street"
                className="border p-2 rounded-md w-full"
              />
            </div>

            <input required
            name="city"
            value={data.city}
            onChange={onChangeHandler}
              type="text"
              placeholder="City"
              className="border p-2 rounded-md w-full"
            />
            <input required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
              type="text"
              placeholder="State"
              className="border p-2 rounded-md w-full"
            />
            <input required
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
              type="text"
              placeholder="Zip Code"
              className="border p-2 rounded-md w-full"
            />
            <input required
            name="country"
            value={data.country}
            onChange={onChangeHandler}
              type="text"
              placeholder="Country"
              className="border p-2 rounded-md w-full"
            />
          </div>
          <input required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
            type="text"
            placeholder="Phone"
            className="border p-2 rounded-md w-full mt-4"
          />
        </div>

        {/* Right Side: Cart Totals */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cart Totals
          </h2>
          <div className="space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between border-b pb-2">
              <p className="text-gray-600 text-lg">SubTotal</p>
              <p className="text-gray-800 font-medium text-lg">
                ${getTotalCartAmount()}
              </p>
            </div>

            {/* Delivery Fee */}
            <div className="flex justify-between border-b pb-2">
              <p className="text-gray-600 text-lg">Delivery Fee</p>
              <p className="text-gray-800 font-medium text-lg">${getTotalCartAmount()===0?0:2}</p>
            </div>

            {/* Total */}
            <div className="flex justify-between font-semibold text-xl">
              <p className="text-gray-700">TOTAL</p>
              <p className="text-gray-900">
                ${getTotalCartAmount()===0?0:getTotalCartAmount()+2}
              </p>
            </div>
          </div>

          {/* Checkout Button */}
          <button type="submit" className="mt-8 w-full bg-slate-800 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-slate-600 transition duration-300">
            PROCEED TO PAYMENT
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
