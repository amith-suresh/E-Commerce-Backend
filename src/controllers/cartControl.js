
import { addToCartService, deleteAllCartService, deleteCartService, getCartService } from "../services/cartService.js";
import CustomError from "../utils/customError.js";
import { successHandler } from "../utils/responseHandler.js";


export const addToCart=async (req,res,next)=>{
  const userId = req.user?.userId;
    if(!req.user){
      return next(new CustomError("Unauthorized - User not authenticated", 401));
    }
    let {productId,quantity}=req.body;
    quantity=Number(quantity)
    const data = {productId,quantity}
  try{
    const updatedCart = await addToCartService(userId,data)
    return successHandler(res,201,"added to cart",updatedCart) 
  }
  catch(error){
    console.error("Error in cart",error)
    return next(new CustomError("Internal Server Error",500));
  }
}


export const getCart= async(req,res,next)=>{
  const userId=req.user?.userId;
  try{
    const cart = await getCartService(userId)
    if(!cart){
      return next(new CustomError("Cannot get cart",404))
    }else{
      return successHandler(res,201,"cart shown",cart)
    }
  }catch(error){
    console.error("Error in cart",error)
    return next(new CustomError("Internal Server Error",500));
  }
}


export const deleteCart = async(req,res,next)=>{
  const userId = req.user?.userId;
  let {productId}=req.body;
  
  // console.log(" Incoming DELETE request...");
  // console.log(" Extracted userId from req.user:", userId);
  // console.log(" Extracted productId from req.body:", productId);
  try{
    await deleteCartService(userId,productId)
    return successHandler(res,201,"deleted")
  }catch(error){
    console.error("Error in cart",error)
    return next(new CustomError("Internal Server Error",500));
  }
}

export const deleteAll = async(req,res,next)=>{
  const userId = req.user?.userId;
  const {productId}=req.body;
  try{
    await deleteAllCartService(userId,productId)
    return successHandler(res,201,"deleted")
  }catch(error){
    console.error("Error in cart",error)
    return next(new CustomError("Internal Server Error",500));
  }
  }

