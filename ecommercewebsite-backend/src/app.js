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
import NodeCache  from 'node-cache'
import paymentRouter from "../routes/Payment.route.js";
import reviewRouter from "../routes/Review.route.js";

const app = express(); 
export const cache = new NodeCache();
 
cache.on('error', (err) => {
    console.error('Redis error:', err);
  });
const corsOpt = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://ecommerce-frontend-jq4t.onrender.com',
      'http://localhost:3000' 
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PATCH,PUT,DELETE",
  credentials: true
};

app.use(cors(corsOpt));
app.options('*', cors(corsOpt));

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


app.use('/api/v1/user',userRouter);  
app.use('/api/v1/owner',ownerRouter);
app.use('/api/v1/product',productRouter);

app.use('/api/v1/payment', paymentRouter);
app.use('/api/v1/reviews',reviewRouter); 

export {app}