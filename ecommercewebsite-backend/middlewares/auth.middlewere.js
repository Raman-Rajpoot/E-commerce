// import { verify } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asynHandler.js";
import jwt from 'jsonwebtoken';
const { verify } = jwt;

// Your middleware code


const verifyJwt=asyncHandler( async (req,res,next)=>{
    console.log('start jwt');
    console.log(req.cookies.accessToken)
    try{
    const accessToken=  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if(!accessToken) throw new ApiError(404, "Unauthorized user");

    const tokenDecode = verify(accessToken,process.env.ACCESS_TOKEN_SECRET);

    const user =await User.findById(tokenDecode?._id).select("-password -refreshToken");
    if(!user) throw new ApiError(404, " user not found ");

    req.user= user;
    console.log("next")
    next();
    }catch(err){
        console.log(err.messege);
        throw new ApiError(400, "error occure during authrising user");
    }
});

export {verifyJwt}