import product from "../models/productModel.js";

export const addNewProduct= async (data)=>{
    const newProduct = new product(data);
    return await newProduct.save()
};

export const getAllProductsServices= async(filters,page,limit)=>{
    await product.find(filters)
    .skip((page-1)*limit)
    .limit(limit)
    return product;
}

export const getSingleProductService= async(id)=>{
    return await product.findById(id)
}

