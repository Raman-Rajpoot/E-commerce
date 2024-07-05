// app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "../routes/User.route.js"
import ownerRouter from "../routes/Owner.route.js"
import {v2 as cloudinary} from 'cloudinary';
import { productRouter } from "../routes/Product.route.js";
import bodyParser from "body-parser";
import { upload } from "../middlewares/multer.middleware.js";
const app = express();

  
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(bodyParser.json({
    limit: "20kb" 
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: "20kb"
}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));  // public is the folder name

app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/v1/user',userRouter);  
app.use('/api/v1/owner',ownerRouter);
app.use('/api/v1/product',productRouter); 
export {app}