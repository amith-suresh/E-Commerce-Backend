
import errorHandler from "../middlewares/errorHandler";
import { addToCartService } from "../services/cartService";
import { successHandler } from "../utils/responseHandler";


export const addToCart=async (res,req,next)=>{
  const userId = req.params.id;
  const {productId,quantity}=req.body;
  const data = {productId,quantity}
  try{
    await addToCartService(userId,data)
    return successHandler(res,201,"added to cart")
  }
  catch(error){
    return next(new errorHandler("Internal Server Error",500));
  }
}

