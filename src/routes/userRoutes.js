import express from 'express';
import {createValidator} from 'express-joi-validation'
import { register,login, testAuth } from '../controllers/userControl.js';
import { loginvalidation, signupvalidation } from '../Validation/userValidation.js';
import authenticate from '../middlewares/authMiddleware.js';


const userRouter = express.Router();
const validator=createValidator({passError:true})

userRouter.post('/register',validator.body(signupvalidation),register);
userRouter.post('/login',validator.body(loginvalidation),login);
userRouter.get('/auth',authenticate,testAuth)


export default userRouter;