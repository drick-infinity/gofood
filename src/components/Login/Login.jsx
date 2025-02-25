import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const {url,setToken} = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [modalOpen, setModalOpen] = useState(true); 
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler=(event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async(event)=>{
    event.preventDefault();
    let newUrl = url;
    if(currState==="Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data);
    if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
    }
    else{
      alert(response.data.message);
    }
  }

  useEffect(() => {
    console.log(data);
    if (modalOpen) {
      document.body.style.overflow = 'hidden'; 
      document.body.style.overflow = 'auto'; 
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [modalOpen,data]);

  return (
    <section className="absolute min-h-screen z-50 flex justify-center overflow-hidden items-center bg-[#00000090] inset-0 bg-black bg-opacity-50 backdrop-blur-md">
    
      <div className="relative z-20 bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <form className="mx-auto" onSubmit={onLogin}>
          <img
            className="absolute top-6 right-6 w-5 h-5 cursor-pointer"
            onClick={() => {
              setShowLogin(false);
              setModalOpen(false);
            }}
            src={assets.cross_icon}
            alt="Close"
          />
          <div className="mb-11 text-center">
            <h2>{currState}</h2>
            <h1 className="text-gray-900 font-manrope text-3xl font-bold leading-10 mb-2">
              GOFOOD
            </h1>
            <p className="text-gray-500 text-base font-medium leading-6">
              Let’s get your food, order Now
            </p>
          </div>
          <div>
          <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
                type="text"
                className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg font-normal rounded-md border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Email"
              />
            {currState === "Login" ? (
              <></>
            ) : (
              <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg font-normal rounded-md border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
              placeholder="Username"
            />
            )}
          </div>
          <input
          name="password"
          onChange={onChangeHandler}
          value={data.password}
            type="password"
            className="w-full h-12 text-gray-900 placeholder-gray-400 text-lg font-normal rounded-md border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
            placeholder="Password"
          />
          <a href="#" className="flex justify-end mb-6">
            <span className="text-slate-800 text-right text-base font-normal leading-6 hover:text-slate-700">
              Forgot Password?
            </span>
          </a>
          <button className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-md hover:bg-slate-700 transition-all duration-300 bg-slate-800 shadow-sm mb-11">
            {currState}
          </button>
          <a
            href="#"
            className="flex justify-center text-gray-900 text-base font-medium leading-6"
          >
            <button type="submit">
              {currState === "Sign Up" ? "Create Account" : "Login"}
            </button>
            &nbsp;|| Don’t have an account?
            <span
              onClick={() =>
                setCurrState(currState === "Login" ? "Sign Up" : "Login")
              }
              className="text-slate-800 hover:text-slate-700 font-semibold pl-3 cursor-pointer"
            >
              {currState === "Login" ? "Sign Up" : "Login"}
            </span>
          </a>
        </form>
      </div>
    </section>
  );
};

export default Login;

