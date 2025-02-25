import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error connecting to server");
    }
  };


  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="min-h-screen p-6 ml-5 ">
      <div className="bg-white shadow-lg rounded-xl p-16">
        <p className="text-2xl font-bold text-gray-700 mb-6">All Food List</p>

        <div className="hidden md:grid grid-cols-5 gap-20 bg-gray-200 w-full text-gray-700 font-medium p-4 rounded-t-lg">
          <div>Image</div>
          <div>Name</div> 
          <div>Category</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        <div className="divide-y divide-gray-200">
          {list.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-5 grid-cols-1 items-center gap-14 p-4 hover:bg-gray-50 transition"
            >
              <div className="flex justify-center">
                <img
                  src={`${url}/images/${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </div>
              <div className="text-center md:text-left">{item.name}</div>
              <div className="text-center md:text-left">{item.category}</div>
              <div className="text-center md:text-left font-semibold text-gray-600">
                Rs.{item.price}
              </div>
              <div className="text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                  onClick={()=> removeFood(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
