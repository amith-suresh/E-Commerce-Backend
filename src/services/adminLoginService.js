import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


export const adminLoginService =async(email,password)=>{
   const admin = await User.findOne({email})
   if (!admin || admin.role !== "admin") {
    throw new Error("Access denied!");
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid credentials!");
  }
  const token = jwt.sign(
    { userId: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {token,admin};
};
