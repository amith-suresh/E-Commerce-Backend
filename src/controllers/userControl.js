import { registerUser,loginUser } from "../services/userService.js";
import { accessToken, refreshToken } from "../utils/Jwt.js";

export const register= async(req,res)=>{
    try{
        const{username,email,password}=req.body;
     const user = await registerUser(username,email,password)
     res.status(201).json({message:"registered",user})
    }
    catch(error){
     res.status(400).json({message:"error",error :error.message})
    }
};


// export const login = async(req,res)=>{
//     try{
//         const{email,password}=req.body;
//         const user = await loginUser(email,password);
//         const token = accessToken(user);
//         const refresh = refreshToken(user);
//         res.cookie("token", token, {
//             httpOnly: true, 
//             secure: false, 
//             sameSite: "strict", 
//         });
//         res.status(201).json({message:"Logged in"})

//         res.cookie("refresh", refresh, {
//             httpOnly: true, 
//             secure: false, 
//             sameSite: "strict", 
//         });
//         res.status(201).json({message:"Logged in"})

        
//     }catch(error){
//         res.status(400).json({message:"error",error: error.message})
//     }
// };

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });  
        }

        const token = accessToken(user);
        const refresh = refreshToken(user);

        res
            .cookie("token", token, { httpOnly: true, secure: false, maxAge: 3 * 24 * 60 * 60 * 1000 })
            .cookie("refresh", refresh, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .status(200)
            .json({
                message: "User logged in successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });

        return; 

    } catch (error) {
        next(error); 
    }
};


export const testAuth = async (req, res, next) => {
    try {
        return res.status(200).json({ message: "Protected route accessed", user: req.user });
    } catch (error) {
        next(error);
    }
};