import mongoose, {Schema} from "mongoose";
// import jwt from JsonWebTokenError
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"

// import { type } from "os";
// import { stringify } from "querystring";
// import { Product } from "./product.model";


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: [true,"password is requiered"]
    },
    fullName:{
        type: String
    },
    refreshToken:{
        type: String
    },
    userImage: {
        type:String
    },
    userLocation: {
        address: {
            type: String,
            default : "",
            trim: true
        },
        city: {
            type: String,
            default : "",
            trim: true
        },
        state: {
            type: String,
            default : "",
            trim: true
        },
        country: {
            type: String,
            default : "",
            trim: true
        },
        zipCode: {
            type: String,
            default : "",
            trim: true
        }
    },
    cart:[{
        productId :{
            type : String,
            required : true,

        },
        productName:{
            type : String,
            required : true,
             trim: true
        },
        productImage : {
            type : String,
            required : true,
        },
       productPrice:{
        type:mongoose.Schema.Types.Decimal128,
        required : true,
         
       },
       productOldPrice:{
        type:mongoose.Schema.Types.Decimal128,
        required : true,
         
       },
    rating:{
      type: mongoose.Schema.Types.Decimal128,
     default: 0.0
    },
    stock:{
        type:Number,
        default:0
      },
      category: {
       type: String,
    //    enum: ['male', 'female', 'kid'],
       required: true,
     },
    }] 
,
    buyHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'ProductStatus'
      }]
});

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
          _id: this._id,
          email: this.email,
          userName: this.userName,
          fullName: this.fullName
     },
        process.env.ACCESS_TOKEN_SECRET,
     {expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
     
}

userSchema.methods.generateRefreshToken = function(){
   return  jwt.sign({
         _id: this._id
         
    },
       process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
    
}


userSchema.pre("save",async function(next){
   
       console.log(this, this.password)
    if (!this.isModified('password')) {
        return next();
    }
     this.password = await bcrypt.hash(this.password, 10)
    next()
})
// const bcrypt = require('bcrypt');

userSchema.methods.isPasswordCorrect = async function(password) {
    try {
        const match = await bcrypt.compare(password, this.password);
        return match;
    } catch (error) {
        throw new Error(error);
    }
}; 

export const User = mongoose.model("User", userSchema);