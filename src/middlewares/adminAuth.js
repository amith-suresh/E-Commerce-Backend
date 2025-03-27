import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.adminToken; 

    if (!token) {
      return res.status(401).json({ message: "Unauthorized! No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden! Admin access required." });
    }

    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};
