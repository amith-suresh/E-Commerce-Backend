
import { addNewProduct } from "../services/productService.js";


export const addProduct= async (req,res)=>{
   try{
    await addNewProduct(req.body)
    res.status(201).json({
        success: true,
        message: "Product added successfully"
    });
   }
   catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}
}