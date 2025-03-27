import express from 'express';
import { createAdmin, loginAdmin } from '../controllers/adminLoginControl.js';
import { adminAuth } from '../middlewares/adminAuth.js';
import { getAllUser, getSingleUser, toggleBlockUser } from '../controllers/adminControl.js';


const adminRouter = express.Router();



adminRouter.post('/create',createAdmin)
adminRouter.post('/login',loginAdmin);
adminRouter.get('/users',adminAuth,getAllUser)
adminRouter.get('/user/:id',adminAuth,getSingleUser)
adminRouter.patch('/block-user/:id',adminAuth,toggleBlockUser)


export default adminRouter;