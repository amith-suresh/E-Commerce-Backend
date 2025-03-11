import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:Number
    },
    img:{
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    stock:{
        type:String,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const product = mongoose.model('product',productSchema);

export default product;