import express from 'express';
import { addProduct } from '../controllers/productControl.js';
import { getAllProducts } from '../controllers/productControl.js';
import { getSingleProduct } from '../controllers/productControl.js';

const productRouter=express.Router();

productRouter.post('/add',addProduct)
productRouter.get('/all',getAllProducts)
productRouter.get('/getSingle/:id',getSingleProduct)

export default productRouter;