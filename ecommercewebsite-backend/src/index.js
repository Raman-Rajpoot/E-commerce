import express, { Router } from 'express';
import dotenv from "dotenv";
import cors from 'cors'
import connectDB from '../db/index.js';
import userRouter from "../routes/User.route.js";
import {v2 as cloudinary} from 'cloudinary';
import {app} from './app.js'
dotenv.config(
    { path: './.env' }
);
// const app = express();

// app.use('/api/v1/user',userRouter);  
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET, // Fixed api_secret variable
    secure: true
  });
  app.use(cors({
    origin: 'http://localhost:3000',  // The URL of your frontend
    credentials: true,  // Allow credentials (cookies, etc.)
}));
connectDB().then(()=>{
    app.on("error",(err)=>{
        console.log("Error!! ", err); 
        throw err;
   });
   app.listen(process.env.PORT || 4000 ,()=>{
       console.log("App is Listening at port ",process.env.PORT);
   });
}).catch((err)=>{
    console.log("Connection Error!!!  ",err);
    throw err; 
})

// app.use(cors())