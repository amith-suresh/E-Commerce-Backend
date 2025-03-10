import cors from 'cors'
import express from 'express'
import { db } from '../config/connectDB.js'
import router from './routes/userRoutes.js'

const app=express()


app.use(cors())
app.use(express.json())
app.use("/api",router)
db()
export default app