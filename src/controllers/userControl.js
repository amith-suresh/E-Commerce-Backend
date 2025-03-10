
import { registerUser,loginUser } from "../services/userService.js";

export const register= async(req,res)=>{
    try{
        const{username,email,password}=req.body;
     const user = await registerUser(username,email,password)
     res.status(201).json({message:"registered",user})
    }
    catch(error){
     res.status(400).json({message:"error",error :error.message})
    }
};

export const login = async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user = await loginUser(email,password);
        res.status(201).json({message:"Logged in",user})
    }catch(error){
        res.status(400).json({message:"error",error: error.message})
    }
};
