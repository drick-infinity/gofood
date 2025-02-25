import React, { useState, useImperativeHandle,useEffect, useContext, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const VoiceNavigation = forwardRef((props,ref) => {
  const [isListening, setIsListening] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  // List of commands
  const commands = {
    home: () => navigate("/"),
    menu: () => navigate("/menu"),
    contact: () => navigate("/contact"),
    cart: () => navigate("/cart"),
    orders: () => navigate("/myorders"),
    "place order": () => placeOrder(),
    "make payment": () => navigate("/payment"),
  };

  // Function to handle order placement (mock example)
  const placeOrder = () => {
    const total = getTotalCartAmount();
    if (total > 0) {
      alert("Order placed successfully!");
      navigate("/myorders");
    } else {
      alert("Your cart is empty. Add items to place an order.");
    }
  };

  // Start Voice Recognition
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition(); // For Chrome
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started. Speak a command...");
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log("Command received:", command);

      // Match command to actions
      const action = Object.keys(commands).find((key) => command.includes(key));
      if (action) {
        commands[action]();
      } else {
        alert("Command not recognized. Try again.");
      }
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended.");
    };

    recognition.start();
  };
  useImperativeHandle(ref, () => ({
    startListening,
  }));

  return null;
});

export default VoiceNavigation;
