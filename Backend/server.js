import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/mongodb.js'
import { connectCloudinary } from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'

//app config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary({ debug: true })

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 


// api endpoint
app.use('/api/admin', adminRouter)



app.get('/', (req,res) =>{
    res.send('API WORKING')
})

app.listen(port, ()=> console.log("Server Started", port))