import { cart } from "../models/cartSchema.js";
import { order } from "../models/orderModel.js";

export const placeOrderService=async(userId,data)=>{
    const existUser = await cart.findOne({userId:userId})
    if(!existUser){
        throw new CustomError('Cant proceed',400)
    }
  const newOrder= new order({
    userId,
    products:existUser.products,
    name:data.name,
    paymentMethod:data.paymentMethod,
    total:data.total
  })

  await newOrder.save()
  await cart.findOneAndDelete({userId:userId});
  return newOrder;
};


export const showOrderService=async(userId)=>{
  const orders = await order.find({userId});
  if(!orders){
    throw new CustomError('Cant proceed',400)
  }
  return orders;
}