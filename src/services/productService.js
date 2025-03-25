import Product from "../models/productModel.js";


export const addNewProduct= async (data)=>{
    const newProduct = new product(data);
    return await newProduct.save()
};

export const getAllProductsServices= async(filters,page,limit)=>{
  const product=  await Product.find(filters)
    return product;
}

export const getSingleProductService= async(id)=>{
    return await Product.findById(id)
}

export const updateProductService = async(id,updatedData)=>{
  const existing = await Product.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  if(!existing){
    throw new CustomError('product is unavailable',400)
}
return existing
};


export const deleteProductService = async(id)=>{
    const deleteItem = await Product.findByIdAndDelete(id);
    if(!deleteItem){
        throw new CustomError('product is unavailable',400)
    }
    return deleteItem
}
