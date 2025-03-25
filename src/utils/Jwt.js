import jwt from 'jsonwebtoken';



export const accessToken =(user)=>{
    return jwt.sign({userId:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn: "3d"})
};

export const refreshToken = (user) => {
    return jwt.sign({ userId: user._id },process.env.JWT_SECRET,{ expiresIn: "7d" });
};

export const verifyToken =(token ,secret)=>{
    try{
        return jwt.verify(token,secret)
    }catch(error){
        return null
    }
}   


