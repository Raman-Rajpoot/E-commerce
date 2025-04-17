import { Double, Int32 } from "mongodb";
import mongoose, { Schema } from "mongoose";



const productSchema = new mongoose.Schema({
      title:{
         type: String,
         required : true,
      },
      productImage: {
         type: String,
         required : true
      },
     price:{
         type:mongoose.Schema.Types.Decimal128,
         required: true
     },
     rating:{
       type: mongoose.Schema.Types.Decimal128,
      default: 0.0
     },
     discount:{
      type: Number ,
       default:0
     },
     owner:{
     type:  Schema.Types.ObjectId,
     ref: "Owner",
     required: true,
     index: true
     },

     description:{
      type: String
     },
     stock:{
       type:Number,
       default:0
     },
     category: {
      type: String,
      enum: ['male', 'female', 'kid'],
      required: true,
    },
     ageRange: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
  
    },
    
},{timestamps: true});

export const Product =  mongoose.model("Product", productSchema);