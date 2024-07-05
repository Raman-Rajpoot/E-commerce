import { Int32 } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ownerSchema = new Schema({
    userInfo:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    companyName :{
        type: String,
        required:true,
        unique: true,
    },
    pinCode:{
       type: Number,
       required:true
    },
    companyAddress:{
        address: {
            type: String,
            
            trim: true
        },
        city: {
            type: String,
            
            trim: true
        },
        state: {
            type: String,
            
            trim: true
        },
        country: {
            type: String,
           
            trim: true
        },
        zipCode: {
            type: String,
           
            trim: true
        }
    },
    productListed:[{
        type:Schema.Types.ObjectId,
        ref: "Product"
    }],

},
     {timestamps: true})

export const Owner =  mongoose.model("Owner", ownerSchema)   