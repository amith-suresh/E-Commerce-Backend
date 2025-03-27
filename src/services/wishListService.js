
import { wishlist } from "../models/wishListModel.js";
import product from "../models/productModel.js";
import User from "../models/userModel.js";
import CustomError from "../utils/customError.js";


// export const addToListService = async (id, pid) => {
//     try {
//         console.log(id,pid);
        
      

//         const user = await User.findById(id);
//         if (!user) {
//             throw new Error("User not found");
//         }

//         const productItem = await product.findById(pid);
//         if (!productItem) {
//             throw new Error("Product not found");
//         }

     
//         let list = await wishlist.findOne({ userId: id });

//         if (!list) {
//             list = new wishlist({
//                 userId: id,
//                 products: [],
//             });
//         }

        
//         const check = list.products.some((item) => item.toString() === pid.toString());
//         if (check===true) {
//             throw new CustomError("Product already exists in wishlist", 400);
//         }

        
//         list.products.push(pid);
//         await list.save();

//         console.log("Updated Wishlist:", list);
//         return list;
//     } catch (error) {
//         console.error("Error in addToListService:", error);
//         throw error;
//     }
// };



//    const alreadyExists = existingList.products.some(
//     (item) => item.product === productId
//   );
//   if (alreadyExists) {
//     throw new Error("Product already in wishlist");
    
//   }else if(!alreadyExists){
//     existingList.products.push(productId)
//     await existingList.save();
//   }
//   return existingList;
// }


export const addToListService = async (id, pid) => {
    try {


        const user = await User.findById(id);
        if (!user) {
            throw new CustomError("User not found", 404);
        }

      
        const productItem = await product.findById(pid);
        if (!productItem) {
            throw new CustomError("Product not found", 404);
        }

        
        let list = await wishlist.findOne({ userId: id });

        if (!list) {
            list = new wishlist({
                userId: id,
                products: [],
            });
        }

        const check = list.products.some((item) => item.toString() === pid.toString());
        if (check) {
            throw new CustomError("Product already exists in wishlist", 400);
        }

        list.products.push(pid);
        await list.save();
        return list;

    } catch (error) {
        console.error("Error in addToListService:", error.message, "Status:", error.statusCode || 500);
        throw new CustomError(error.message || "Internal Server Error", error.statusCode || 500);
    }
};

export const showWishListService = async (userId) => {
    try {
        const wishList = await wishlist.findOne({ userId: userId });

        if (!wishList || wishList.products.length === 0) {
            throw new CustomError("wishlist is empty", 400);
        }

        return wishList;  
    } catch (error) {
        console.log("Error fetching wishlist:", error.message);
        throw error; 
    }
};

export const removedWishListService = async (userId, productId) => {
    try {
        const existing = await wishlist.findOne({ userId: userId });
        if (!existing) {
            throw new Error("Wishlist not found");
        }

        const productIndex = existing.products.findIndex(
            (item) => item.toString() === productId.toString()
        );

        if (productIndex === -1) {
            throw new Error("Product not found in wishlist");
        }

        
        existing.products.splice(productIndex, 1);

        await existing.save();
        return existing;
    } catch (error) {
        console.error("Error in removedWishListService:", error.message);
        throw error;
    }
};

