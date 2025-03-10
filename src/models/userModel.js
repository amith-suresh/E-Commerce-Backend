import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },isBlocked:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const User= mongoose.model('User',userSchema);

export default User;