import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const db=()=>{
    mongoose.connect(process.env.MONGOURL).then(()=>{
        console.log("db connected");
    }).catch((error)=>{
        console.log(error); 
    })
};