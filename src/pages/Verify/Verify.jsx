import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios';
const Verify = () => {

  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async ()=>{
    const response = await axios.post(url+"/api/order/verify",{success,orderId});
    if(response.data.success){
        navigate("/myorders");
    }
    else{
      navigate('/');
    }
  }
  useEffect(()=>{
    verifyPayment();
  },[]);
  
  return (
    <div className="flex justify-center items-center min-h-screen">
  <div className="flex space-x-2">
    <div className="w-8 h-8 border-4 border-slate-800 border-t-transparent rounded-full animate-spin sm:w-12 sm:h-12 md:w-16 md:h-16"></div>
    <p className="text-slate-800 font-medium hidden sm:block">Loading...</p>
  </div>
</div>

  )
}

export default Verify