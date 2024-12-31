
import { asyncHandler } from '../utils/asynHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponce.js';
import { User } from '../models/user.model.js';
import { Owner } from '../models/owner.product.model.js';

const newOwner = asyncHandler(async (req,res)=>{
    const {companyName,pinCode,companyAddress} = req.body;
    
    if(!(companyName && companyAddress && pinCode)) 
        throw new ApiError(404, "company info not found");

    const user = await User.findById(req.user?._id).select("-password -refreshToken");

    if(!user) throw new ApiError(404, "user/owner not exist");

    const newOwner =await Owner.create({
        companyName,
        pinCode,
        companyAddress,
        userInfo: user
    }) 
return res.status(200)
.json(200,new ApiResponce(200, newOwner, "new owner created successfully"))
});

export {
    newOwner
}