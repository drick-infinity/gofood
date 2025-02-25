import React,{useState} from 'react';
import { assets } from '../../assets/admin_assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
const Add = ({url}) => {
  const[image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
    })

    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

  const handlePriceChange=(e)=>{
    const value = e.target.value;
    if(value === '' || Number(value)>=0){
      setData(prevData=>({...prevData,price:value}));
      onChangeHandler(e);
    }
  }

  const onSubmitHandler = async(event) => {
   event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    const response = await axios.post(`${url}/api/food/add`,formData)
    if(response.data.success){
        setData({
          name:"",
          description:"",
          price:"",
          category:"Salad"
        })
        setImage(false)
        toast.success(response.data.message)
    }else{
        toast.error(response.data.message)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-start justify-start p-6 mt-5 ml-40">
      <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-8 space-y-8 items-center">
        {/* Upload Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">
            Upload Image
          </label>
          <label className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-slate-800 transition">
            <img
              src={image?URL.createObjectURL(image):assets.upload_area}
              alt="Upload Area"
              className="max-w-full max-h-full object-contain"
            />
            <input type="file" id="image" onChange={(e)=>setImage(e.target.files[0])} hidden required />
          </label>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-3">
            Product Name
          </label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            id="name"
            name="name"
            placeholder="Type here"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-3"
          >
            Product Description
          </label>
          <textarea
          onChange={onChangeHandler}
          value={data.description}
            id="description"
            name="description"
            rows="6"
            placeholder="Write content here"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-3">
              Product Category
            </label>
            <select
              id="category"
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Product Price */}
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-3">
              Product Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={handlePriceChange}
              placeholder="Rs.200"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-3 px-6 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
