import mongoose from 'mongoose';

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://gofooduser:lj2GO1Ygwt7IMclc@cluster0.slrpj.mongodb.net/vite-project').then(()=>console.log("DB Connected"));
}