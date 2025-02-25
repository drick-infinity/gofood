import foodModel from '../models/foodModel.js';
import fs from 'fs';


//add food item

const addFood = async (req,res)=>{
    // console.log("Request received:",req.body);
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
};

//all food list
const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food item by ID
        const food = await foodModel.findById(req.body.id);
        
        // Check if the food item exists
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Remove the image file (if it exists)
        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error("Failed to delete image file:", err);
            });
        }

        // Delete the food item
        await foodModel.findByIdAndDelete(req.body.id);
        
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export {addFood,listFood,removeFood};