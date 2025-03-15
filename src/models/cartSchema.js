import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    products:[{
       productId: {
            type:mongoose.Schema.ObjectId,
            ref:'product'
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    totalPrice:{
        type:Number,
        default:0
    },

},{timestamps:true});

export const cart =mongoose.model('cart',cartSchema)