import { Schema } from "mongoose";
import mongoose  from "mongoose";

const productBuyStatusSchema =new Schema({
    buyProduct:{
        type: Schema.Types.ObjectId,
        ref : "Product"
    },
    deliveryStatus :{
       type : ["pending", "cancel" , "successful", "returned"]
    },
    subStatus: {
        type: ["","shipped","delivered","return"] 
    },
    productCurrentLocation:{
        type: String
    },
},{timestamps: true})

export const ProductStatus =  mongoose.model("ProductStatus",productBuyStatusSchema) 