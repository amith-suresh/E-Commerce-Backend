import { successHandler } from "../utils/responseHandler.js";
import CustomError from "../utils/customError.js";
import { placeOrderService, showOrderService } from "../services/orderService.js";

export const placeOrder = async(req,res,next)=>{
    const userId = req.user?.userId;
    const{products,name,paymentMethod,total}=req.body;
    const data={products,name,paymentMethod,total};
    try{
       const order = await placeOrderService(userId,data)
        return successHandler(res,201,"order placed",order) 
    }catch(error){
        console.error("error while ordering",error)
        return next(new CustomError("Internal Server Error",500));
    }
} 


export const showOrder = async(req,res,next)=>{
    const userId=req.user?.userId;
    try{
        const showorder = await showOrderService(userId)
        return successHandler(res,201,"order shown",showorder) 
    }catch(error){
        console.error("error while showing",error)
        return next(new CustomError("Internal Server Error",500));
    }
    
}