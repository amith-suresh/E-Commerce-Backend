import cors from 'cors'
import express from 'express'
import { db } from '../config/connectDB.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import productRouter from './routes/productRouter.js'
import errorHandler from './middlewares/errorHandler.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRoutes.js'



const app=express()
db()

app.use(cors({
    credentials: true 
}));
app.use(cookieParser())
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.use(errorHandler)
export default app;