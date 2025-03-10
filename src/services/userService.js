import User from "../models/userModel.js";
import bcrypt from 'bcrypt';


export const registerUser = async(username,email,password)=>{
    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new Error("User already exists")
    };
    const hashedPassword= await bcrypt.hash(password,10);
   
    const newUser = new User({username,email,password:hashedPassword});

    return await newUser.save()
};


export const loginUser = async(email,password)=>{
    const user = await User.findOne({email});
    if(!user){
       throw new Error ("User not logged in")
    };
    const pWord = await bcrypt.compare(password,user.password);

    if(!pWord){
        throw new Error("Invalid Password");
        
    };
    if(user.isBlocked){
        throw new Error("User Blocked");
        
    }
    return user;
}


