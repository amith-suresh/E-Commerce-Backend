import { cart } from "../models/cartSchema.js";


export const addToCartService=async (id,data)=>{
const existingCart = await cart.findOne({userId:id} )
if (!existingCart){
    const newCart = new cart({
        userId:id,
        products:[data],    
    });
   await newCart.save();
    return newCart
}
const productIndex = existingCart.products.findIndex(
    (item)=>item.productId.equals(data.productId))

if(productIndex!==-1){
    existingCart.products[productIndex].quantity += data.quantity
}else{
    existingCart.products.push(data)
};
await existingCart.save();
return existingCart;
}


export const getCartService=async(userId)=>{
    const userCart = await cart.findOne({userId}).populate("products.productId")
    return await userCart;
}

export const deleteCartService=async(userId,productId)=>{
    const exist = await cart.findOne({userId});
   const existProduct = exist.products.find((item)=>item.productId.equals(productId));
   if(existProduct){
    if(existProduct.quantity>1){
        existProduct.quantity -=1;
    }else{
        exist.products = exist.products.filter((item) => item.productId.toString() !== productId); 
    }
   }
   await exist.save();
}

export const deleteAllCartService=async(userId,productId)=>{
    const exist = await cart.findOne({userId});
    if(exist){
      exist.products=exist.products.filter(item=>item.productId.toString()!==productId)
    };
     await exist.save()
}