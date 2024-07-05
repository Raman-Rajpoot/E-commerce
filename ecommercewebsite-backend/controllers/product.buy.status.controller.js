import { asyncHandler } from '../utils/asynHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponce.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Product } from '../models/product.model.js';
import { Owner } from '../models/owner.product.model.js';
import mongoose from 'mongoose';

const buyProductStatus = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) throw new ApiError(404, "invalid product Id");

    const user = await User.findById(req,user?._id);
    if(!user) throw new ApiError(404, "user not found");

    
})