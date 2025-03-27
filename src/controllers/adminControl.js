import User from "../models/userModel.js";
import { successHandler } from "../utils/responseHandler.js";
import CustomError from "../middlewares/errorHandler.js";
import { getSingleUserService, toggleBlockUserService } from "../services/adminService.js";



export const getAllUser = async (req, res, next) => {
  try {
      const users = await User.find({ role: { $ne: "admin" } }).select("-password");
      successHandler(res, 200, "User list retrieved", { users });
  } catch (error) {
    next(new CustomError(error.message || "Internal Server Error", 500));
  }
};

export const getSingleUser=async(req,res,next)=>{
  const{id}=req.params
  try{
    const user = await getSingleUserService(id)
    successHandler(res, 200, "User retrieved", user);
  } catch(error){
    next(error);
  }
}


export const toggleBlockUser = async(req,res,next)=>{
  const {id}=req.params
  try{
    const block = await toggleBlockUserService(id)
    successHandler(res, 200, "User blocked",block);
  } catch(error){
    next(error);
  }
}
