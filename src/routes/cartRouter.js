import express from 'express';
import { addToCart, deleteAll, deleteCart } from '../controllers/cartControl.js';
import { getCart } from '../controllers/cartControl.js';
import authenticate from '../middlewares/authMiddleware.js';




const cartRouter = express.Router();

cartRouter.post('/addtoCart/:id',authenticate,addToCart);
cartRouter.get('/getCart/:id' ,authenticate,getCart);
cartRouter.delete('/deleteCart/:id',authenticate,deleteCart)
cartRouter.delete('/:id/all',authenticate,deleteAll)



export default cartRouter;