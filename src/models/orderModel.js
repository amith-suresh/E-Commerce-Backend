import mongoose from 'mongoose';

const orderSchema =mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },
        products:[{
            productId:{
                type:mongoose.Schema.ObjectId,
                ref:'product'
            },
            quantity:{
                type:Number,
                default:1
            },
            price:{
                type:Number,
                required:true
            }
        }],
         date:{
            type:Date,
            default:Date.now,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        paymentMethod:{
            type:String,
            required:true
        },
        total:{
            type:Number,
            required:true
        }


    },
    {
        timestamps:true
    
    }
);

export const order = mongoose.model('order',orderSchema)