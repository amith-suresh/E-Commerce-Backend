import cors from 'cors'
import express from 'express'
import { db } from '../config/connectDB.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import productRouter from './routes/productRouter.js'



const app=express()


app.use(cors());
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use(cookieParser())
db()
export default app;