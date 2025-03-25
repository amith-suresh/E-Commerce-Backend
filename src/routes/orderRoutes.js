import express from 'express';
import { placeOrder, showOrder } from '../controllers/orderControl.js';
import authenticate from '../middlewares/authMiddleware.js';



const orderRouter = express.Router();

orderRouter.post('/placeOrder',authenticate,placeOrder);
orderRouter.get('/showOrder',authenticate,showOrder);




export default orderRouter;