
import { verifyToken } from "../utils/Jwt.js";




const authenticate =async(req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }
    try{
        const decoded = verifyToken(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(403).json({message:"Invalid or access token expired"})
        }
            req.user = { userId: decoded.userId };
        next(); 
    }catch(error){
        console.log("Authentication Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default authenticate;