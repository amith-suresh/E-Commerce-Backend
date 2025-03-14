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

export const updateProductService = async(id,updatedData)=>{
  const existing = await product.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  if(!existing){
    throw new CustomError('product is unavailable',400)
}
return existing
};


export const deleteProductService = async(id)=>{
    const deleteItem = await product.findByIdAndDelete(id);
    if(!deleteItem){
        throw new CustomError('product is unavailable',400)
    }
    return deleteItem
}
