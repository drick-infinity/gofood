import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/placeorder';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import FoodDisplay from './components/FoodDisplay/FoodDisplay';
const App = () => {
  
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin} />
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/menu' element={<FoodDisplay/>}/>
        <Route path='/contactus' element={<Footer/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
