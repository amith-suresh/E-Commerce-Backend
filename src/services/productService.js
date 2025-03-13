import product from "../models/productModel.js";

export const addNewProduct= async (data)=>{
    const newProduct = new product(data);
    return await newProduct.save()
}