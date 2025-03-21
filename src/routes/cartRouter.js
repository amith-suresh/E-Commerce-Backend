import express from 'express';
import { addToCart, deleteCart } from '../controllers/cartControl.js';
import { getCart } from '../controllers/cartControl.js';

const cartRouter = express.Router();

cartRouter.post('/addtoCart/:id',addToCart);
cartRouter.get('/getCart/:id',getCart);
cartRouter.delete('/deleteCart/:id',deleteCart)


export default cartRouter;