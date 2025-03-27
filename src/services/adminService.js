
import User from "../models/userModel.js";
import CustomError from "../utils/customError.js";


export const getSingleUserService= async (id)=>{
        console.log("id:",id)
        if (!id) {
            throw new CustomError("No ID provided", 400);
        }
        const user = await User.findById(id).select("-password")
        if(!user){
           throw new CustomError('Cant proceed',400)
    }
    return user;
}




export const toggleBlockUserService = async (id) => {
    console.log("id:", id);
    if (!id) {
        throw new CustomError("No ID provided", 400);
    }
    const user = await User.findById(id);
    if (!user) {
        throw new CustomError("User not found", 404);
    }
    user.isBlocked = !user.isBlocked; 
    await user.save();
    return { userId: user._id, isBlocked: user.isBlocked };
};

