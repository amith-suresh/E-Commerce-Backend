import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
       productId: {
            type:mongoose.Schema.ObjectId,
            ref:'product',
            required:true
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
},{timestamps:true});

export const cart =mongoose.model('cart',cartSchema)