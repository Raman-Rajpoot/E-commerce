import express from 'express'
import { asyncHandler } from '../utils/asynHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponce.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Product } from '../models/product.model.js';
import { Owner } from '../models/owner.product.model.js';
import  jwt  from 'jsonwebtoken';


 const generateRefreshAcesssToken =async (id)=>{
    try{
    const user =await User.findById(id);
    console.log(user._id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken(); 
    if(!refreshToken || !accessToken) throw new ApiError(500, "Access and refresh Token not generated")
    user.refreshToken= refreshToken;
    console.log("Refresh Token : ", refreshToken);
    return {accessToken, refreshToken};
    }
    catch(err){
            console.log("error occure during generating token ", err);
    }
 }
const userRegister = asyncHandler(async (req,res)=>{
    // get data
    // validate data
    // check user exist or not
    //upload user image
    // generate access token and refresh token
    // make new user
      console.log("start");

       const {userName, email,password,fullName}= req.body;

      console.log(userName,email,password,fullName);

       if(!userName || !email || !password || !fullName){
            throw new ApiError(404,'fields are missing ');
       }

       const UserExist=await User.findOne({
        $or: [{ email }, {userName}]
    }) 
    if (UserExist) {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log("req : ",req.files); 

    let userImg = ''; 
    if(req.files && Array.isArray(req.files.userImage) && req.files.userImage.length >0){
        userImg= req.files.userImage[0].path;
    } 
    const imgPathAfterUploadingCloudinary=  await uploadOnCloudinary(userImg); 

   console.log("username : ",userImg)

    const newUser =await User.create({
        email,
        password,
        userName,
        fullName,
        userImage:imgPathAfterUploadingCloudinary?.url 
    });

   if(!newUser) throw ApiError(404, "User not created");

   const createdUser= await User.findById(newUser._id).select("-password -refreshToken");
 
   return  res.status(200).json(
    new ApiResponce(200,createdUser, "user created")
   )
});

const loginUser = asyncHandler(async (req, res)=>{
    // get email || username
    // get password
    // check validation
    // genrate cookies and save
   // return 

   const {userName, email, password}= req.body;

   if(!(userName || email) || !password){
    throw new ApiError(404, "required fields are not found");
   }
  
   const Existuser =await User.findOne({
    $or: [{email}, {userName}]
   });
   console.log("Exist user",Existuser?._id)
   if(!Existuser) throw new ApiError(404, "user not found");
//    console.log(Existuser.isPasswordCorrect);
   const passwordCheck=await Existuser.isPasswordCorrect(password);
    console.log(passwordCheck)
   if(!passwordCheck) throw new ApiError(400, "password is incorrect");
 
    const {accessToken, refreshToken} =await  generateRefreshAcesssToken(Existuser._id);
//  console.log(accessToken,refreshToken)
 if(!accessToken || !refreshToken) throw new ApiError(400, "Token not found")
//    req.user= Existuser;
const user = await User.findById(Existuser._id).select("-password -refreshToken" );

   const options= {
    httpOnly:true,
    secure: true
   }
 console.log(user);
   return res.status(200).cookie("accessToken", accessToken,options).cookie("refreshToken",  refreshToken,options).json(new ApiResponce(
    200,
    {user: user,accessToken,refreshToken},
    "successfully logged in"
))

});

const loggedOut = asyncHandler(async (req,res)=>{
    // get user by verifyjwt or Tokens
    // refresh token = null
    // clear cookies
    // return success messege

   
   const user =await User.findById(req.user?._id);
   console.log("Logged Out", user)
   if(!user) throw new ApiError(404, "user not found");

   user.refreshToken= "";

   const options= {
    httpOnly:true,
    secure: true
   } 

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponce(200, {}, "User logged Out"))
})

const updateFullName =asyncHandler(async (req,res)=>{
        // get info
        // validate info
         // get user through tokens
        //update at user
        //save without checking validation/ require
        // return res
     
        const {fullName} =req.body;
        console.log('fullname: ',fullName);

      if(!fullName) throw new ApiError(404, "fullName not found");

      const user = await User.findById(req.user?._id ).select("-password")
     user.fullName =fullName;
    // console.log(user);
        
    return res.status(200).json(200,new ApiResponce(200,user,"fullName updated "))

})

const updatePassword= asyncHandler(async (req,res)=>{
     // get info
        // validate info
         // get user through tokens
        //update at user
        //save without checking validation/ require
        // return res

        const {oldPassword,newPassword}= req.body;
        console.log(oldPassword,newPassword);

       if(!oldPassword || !newPassword) throw new ApiError(400, "invalide password");

        const user =await User.findById(req.user?._id);
        if(!user) throw new ApiError(404, "user not found");

       const passwordCheck=await user.isPasswordCorrect(oldPassword);
       if(!passwordCheck) throw new ApiError(400, "old password is incorrect");
    
       user.password= newPassword; // update value not save so pre dont run
    //    console.log(user.password); //normal pass
       await user.save({validateBeforeSave : false});  //save without validation so pre run
    //    console.log(user.password); // encrypted pass

       const updatedUser= await User.findById(req.user?._id ).select("-password") 
       return res.status(200).json(200,new ApiResponce(200, updatedUser, "password updated"));

})
const updateUserImg = asyncHandler(async (req, res) => {
    console.log("req files ",req.file?.path,req.file)
    const newUserImage =req.file?.path;
    if(!newUserImage) throw new ApiError(400,"file emty")
    // Fetch user from database
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Store the current user image URL
    const oldUserImage = user.userImage;

    // Upload new image to Cloudinary if available
    let userImage = "";
    if (newUserImage) {
        try {
            userImage = await uploadOnCloudinary(newUserImage);
            if (!userImage) {
                throw new ApiError(400, "Error while uploading image on Cloudinary");
            }
        } catch (error) {
            throw new ApiError(500, "Failed to upload image on Cloudinary: " + error.message);
        }
    }

    // Delete old image from Cloudinary if it exists
    if (oldUserImage) {
        try {
            const result = await cloudinary.uploader.destroy(oldUserImage);
            if (!result || result.result !== 'ok') {
                throw new ApiError(400, "Failed to remove old image from Cloudinary");
            }
        } catch (error) {
            throw new ApiError(500, "Failed to delete old image from Cloudinary: " + error.message);
        }
    }

    // Update user object with new image URL
    user.userImage = userImage;

    // Save updated user data to the database
    // await user.save(); 

    // Fetch updated user data excluding sensitive information
    const updatedUser = await User.findById(user._id).select("-password -refreshToken");

    // Return success response with updated user data
    return res.status(200).json(new ApiResponce(200, updatedUser, "User image updated"));
}); 


const refreshAccessToken= asyncHandler(async (req,res)=>{
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    console.log(token)
    if(!token) throw new ApiError(404, "Unauthorisized request");
try {
    
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    
        // if(!decodedToken) throw new ApiError(404,"decoded Token not found");
     console.log(decodedToken)
        const user=await User.findById(decodedToken?._id);
     console.log(user)
        if(!user) throw new ApiError(404,"User not found");
      
        if(token !== user?.refreshToken){
            new ApiError(404, "Token expired or used");
        }
 
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {refreshToken, accessToken}=await generateRefreshAcesssToken(user._id);
       console.log(refreshToken, accessToken)
        return res.status(200).cookie("accessToken", accessToken,options).cookie("refreshToken", refreshToken,options).json(new ApiResponce(
            200,
            {user: user,accessToken,refreshToken},
            "successfully New Tokens Created"
        ))
} catch (error) {
    throw new ApiError(400, "Error during refreshing tokens")
}   })

const getCurrentUser = asyncHandler(async (req,res)=>{
    const userId= req.user?._id;
    const user =await User.findById(userId).select("-password -refreshToken");
    if(!user) throw new ApiError(404, 'Invalid user');

    return  res.status(200).json(new ApiResponce(200, user, "user fetched successfully"));
 
})

const deleteUser = asyncHandler(async (req,res)=>{
    const userId= req.user?._id;
    const user =await User.findById(userId);
    if(!user) throw new ApiError(404, 'Invalid user');
    const owner = await Owner.findOne({ userInfo: user._id });
    user.refreshToken= "";
    await user.deleteOne();
   
    await owner.deleteOne(); 

    const options= {
     httpOnly:true,
     secure: true
    } 
 
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponce(200, {}, "User logged Out"))
})

const addCart = asyncHandler(async (req, res) => {
    const product = req.body;
     console.log(product)
    if (!product || !product.productId || !product.productName || !product.productImage || !product.productPrice) {
        throw new ApiError(400, 'Invalid product details');
    }

    const user = await User.findById(req.user._id);

    if (!user) throw new ApiError(404, 'User not found');

    // Check if the product is already in the cart
    const existingProductIndex = user.cart.findIndex(item => item.productId === product.productId);
    if (existingProductIndex > -1) {
        // Update the existing product if it already exists in the cart
        user.cart[existingProductIndex] = product;
    } else {
        // Add new product to the cart
        user.cart.push(product);
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).select('-password -refreshToken');

    return res.status(200).json(new ApiResponce(200, updatedUser.cart, 'Product added to cart'));
});
  

const addAndUpdateAddress = asyncHandler(async (req,res)=>{
    const {address, country, state, city, zipCode} = req.body;

    if(!(address&&country&& state&& city&& zipCode))
         throw new ApiError(404, "address field missing")

    const user = await User.findById(req.user?._id);

    if(!user) throw new ApiError(404, "User not exist");

    user.userLocation ={address, country,state,city, zipCode}

    return res.status(200).json(new ApiResponce(200, user.userLocation, "successfully saved user location"));

})
const userLocation = asyncHandler(async (req,res)=>{
    
    const user = await User.findById(req.user?._id);

    if(!user) throw new ApiError(404, "User not exist");
    return res.status(200).json(new ApiResponce(200, user.userLocation, "successfully get user address"));

})



const addBuyHistory = asyncHandler(async (req,res)=>{
    const {  productId } = req.params;
    const product =await Product.findById(productId);
     if(!product) throw new ApiError(404, "Product not found");

     const user =await User.findById(req.user?._id);

     const owner =await Owner.findById(product.owner?._id);
     if(!owner || !user) throw new ApiError(400, "user/owner not found");
    const newStatus = new ProductStatus({
      user: user._id,
      product: productId,
      status: 'pending',
      currentLocation: {city: owner.city, state: owner.state }
    });
  
   
      const savedStatus = await newStatus.save();
   if(!savedStatus) throw new ApiError(400, "status not saved");
    //   // Update user and product with the new delivery status
      await User.findByIdAndUpdate(user._id, { $push: { deliveryStatuses: savedStatus._id } });
    //   await Product.findByIdAndUpdate(productId, { deliveryStatus: savedStatus._id });
  
      res.status(201).json(200, new ApiResponce(200, savedStatus, "product added successfully in buy history"));
    } 
)

 const updateBuyStatus = asyncHandler(async (req,res)=>{
    const { status, currentLocation } = req.body;
    const statusId = req.params.id;
  
    try {
      const updatedStatus = await ProductStatus.findByIdAndUpdate(
        statusId,
        { status, currentLocation, updatedAt: Date.now() },
        { new: true }
      );
  
      if (!updatedStatus) {
        return res.status(404).json({ error: 'Status not found' });
      }
  
      res.status(200).json(updatedStatus);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
 })


const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, 'User not found');

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    await user.save();

    res.status(200).json({ success: true, cart: user.cart });
});

const getCartItems = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.productId');
    if (!user) throw new ApiError(404, 'User not found');

    res.status(200).json({ success: true, cart: user.cart });
});
export {
    userRegister,
    loginUser,
    loggedOut,
    updateFullName ,
    updatePassword ,
    updateUserImg,
    refreshAccessToken,
    addCart, 
    addAndUpdateAddress,
    userLocation,
    addBuyHistory,
    updateBuyStatus,
    getCurrentUser,
    deleteUser,
    removeCartItem,
    getCartItems
} ;