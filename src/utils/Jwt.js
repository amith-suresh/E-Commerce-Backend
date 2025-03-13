import jwt from 'jsonwebtoken';


export const accessToken =(user)=>{
    return jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"})
};