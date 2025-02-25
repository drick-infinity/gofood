import React, { createContext, useState, useEffect } from "react";
import axios from "axios"

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  // Load cart items from localStorage or initialize as empty
  // const [cartItems, setCartItems] = useState(() => {
  //   const storedCart = localStorage.getItem("cartItems");
  //   return storedCart ? JSON.parse(storedCart) : {};
  // });
  // Load cart items from localStorage or initialize as empty
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
  
    // Try parsing the stored cart, but handle the case if it's already an object.
    try {
      // Check if it's already an object (and not a string)
      if (storedCart && typeof storedCart === 'string') {
        return JSON.parse(storedCart);
      }
      // If no stored data or invalid format, return an empty object
      return {};
    } catch (error) {
      console.error("Error parsing cart items from localStorage:", error);
      return {}; // Fallback to empty object on error
    }
  });
  

  const url = "http://localhost:4000";
  const [token,setToken] = useState("");
  const [food_list,setFoodList] = useState([]);
 
  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add items to cart
  const addToCart = async(itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  // Function to remove items from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      const updatedCart = { ...prev };
      updatedCart[itemId] -= 1;
      if (updatedCart[itemId] <= 0) {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
    if(token){
      await axios.post(url + "/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    if (!food_list.length || !Object.keys(cartItems).length) return 0;
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // const getTotalCartAmount =()=>{
  //   let totalAmount = 0;
  //   for(const item in cartItems){
  //     if(cartItems[item]>0){

  //       let itemInfo = food_list.find((product)=>product._id === item);
  //       totalAmount += itemInfo.price*cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // }

  const fetchFoodList = async ()=>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data || []);
  }

  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }

  useEffect(()=>{
   
    async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
    }
    }
    loadData();
  },[food_list])

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
