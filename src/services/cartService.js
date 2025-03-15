import { cart } from "../models/cartSchema";


export const addToCartService=async (id,data)=>{
const existingCart = await cart.findOne({userId:id} )
if (!existing){
    const newCart = new cart({
        userId:id,
        products:[data],    
    });
   await newCart.save();
    return newCart
}
}