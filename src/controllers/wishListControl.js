import { addToListService, removedWishListService, showWishListService } from "../services/wishListService.js";
import CustomError from "../utils/customError.js";
import { successHandler } from "../utils/responseHandler.js";



export const addToList=async(req,res,next)=>{
    const userId=req.user?.userId;
    if(!req.user){
        return next(new CustomError("Unauthorized - User not authenticated", 401));
      }

      const {id}=req.params
     
     try{
     const list= await addToListService(userId,id)
       return successHandler(res,201,"added to wishList",list) 
     } catch(error){
    return next(error);
  }
}


export const showWishList=async(req,res,next)=>{
  const userId = req.user?.userId;
  try{
    const wishlist = await showWishListService(userId)
    return successHandler(res,201,"shown wishList",wishlist) 
  }catch(error){
    return next(new CustomError("Internal Server Error",500));
  }
}


export const deleteList = async(req,res,next)=>{
  const userId = req.user?.userId;
  const{productId}=req.params;
  try{
    removedlist=await removedWishListService(userId,productId);
    return successHandler(res,201,"removed",removedlist) 
  }catch(error){
    return next(new CustomError("Internal Server Error",500));
  }
}