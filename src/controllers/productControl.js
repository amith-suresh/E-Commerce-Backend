import CustomError from "../utils/customError.js";
import { addNewProduct, getAllProductsServices, getSingleProductService } from "../services/productService.js";


export const addProduct= async (req,res,next)=>{
   try{
    await addNewProduct(req.body)
    res.status(201).json({
        success: true,
        message: "Product added successfully"
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
    await getAllProductsServices(filters,limit,page)
    res.status(200).json({
        success:true
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