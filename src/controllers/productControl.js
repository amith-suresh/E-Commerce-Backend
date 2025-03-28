import CustomError from "../utils/customError.js";
import { addNewProduct, deleteProductService, getAllProductsServices, getSingleProductService, updateProductService } from "../services/productService.js";
import errorHandler from "../middlewares/errorHandler.js";


export const addProduct= async (req,res,next)=>{
   try{
    await addNewProduct(req.body)
    res.status(201).json({
        success: true,
        message: "Product added successfully",
    });
   }
   catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
    return next(error)
}
};

export const getAllProducts = async(req,res,next)=>{
try{
    const{category,search,limit =10,page=1}=req.query;
    let filters={};
    if(category){
        filters.category=category
    }
    if(search){
        filters.name = { $regex: search, $options: "i" };
    }
   const result = await getAllProductsServices(filters,limit,page)
    res.status(200).json({
        success:true,
        data:result
    })
}catch (error) {
    return next(new CustomError("Internal Server Error", 500));
  }
}

export const getSingleProduct=async(req,res,next)=>{
   try{
   const product = await getSingleProductService(req.params.id)
    res.status(200).json({
        success:true,
    })
    if (!product) {
        return next(new CustomError("Product not found", 404));
      }
   }catch (error) {
    return next(new CustomError("Internal Server Error", 500));
  }
}

export const updateProduct=async(req,res,next)=>{
    const id = req.params.id
    const updatedData = req.body
    try{
        const existingProduct = await updateProductService(id,updatedData)
        if (!existingProduct) {
          return next(new errorHandler("Product not found", 404));
        }
      res.status(200).json({
        success:true,
    })
    }catch (error) {
        return next(new errorHandler("Internal Server Error", 500));
      }  
}

export const deleteProduct=async(req,res,next)=>{
    const id = req.params.id
    try{
        await deleteProductService(id)
        res.status(200).json({
            success:true,
            message:"item deleted successfully"
        })
    }catch (error) {
        return next(new CustomError("Internal Server Error", 500));
      } 
}