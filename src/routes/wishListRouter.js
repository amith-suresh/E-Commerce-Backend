import express from'express';
import authenticate from '../middlewares/authMiddleware.js';
import { addToList, deleteList, showWishList } from '../controllers/wishListControl.js';



const wishListRouter = express.Router();

wishListRouter.post('/add/:id',authenticate,addToList);
wishListRouter.get('/show',authenticate,showWishList);
wishListRouter.delete('/delete/:productId',authenticate,deleteList)


export default wishListRouter