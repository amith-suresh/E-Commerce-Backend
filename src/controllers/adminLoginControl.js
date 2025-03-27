
import bcrypt from 'bcrypt';
import { adminLoginService } from '../services/adminLoginService.js';
import User from '../models/userModel.js';



export const createAdmin = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingAdmin = await User.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists!" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newAdmin = new User({
        username,
        email,
        password: hashedPassword,
        role: "admin",
      });
  
      await newAdmin.save();
  
      res.status(201).json({ message: "Admin account created successfully!" });
    } catch (error) {
        console.error("Error creating admin:", error);
      res.status(500).json({ message: "Server error!" });
    }
  };
  

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;  

    const result = await adminLoginService(email, password);  
    const token = result.token;  
    const admin = result.admin;  

    res
      .cookie("adminToken", token, { httpOnly: true, secure: false, maxAge: 3 * 24 * 60 * 60 * 1000 }) 
      .status(200)
      .json({
        message: "Admin logged in successfully",
        admin: {
          username: admin.username,
          role: admin.role,
        },
      });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
