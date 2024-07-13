import { asyncHandler } from '../utils/asynHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponce.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Product } from '../models/product.model.js';
import { Owner } from '../models/owner.product.model.js';
import mongoose from 'mongoose';




const addNewProductItem = asyncHandler(async (req, res) => {
  const { title, category, price, description, stock, ageCategory } = req.body;
  console.log(title, category, price, description, stock, ageCategory);

  if (!(title && category && price && description && stock && ageCategory)) {
    throw new ApiError(404, 'Product required information is missing');
  }

  const user = await User.findById(req.user?._id).select('-password -refreshToken');
  console.log(user);
  if (!user) throw new ApiError(404, "Owner not exist/found");

  const owner = await Owner.findOne({ userInfo: user._id });
  console.log("owner " ,owner);
  if (!owner) throw new ApiError(404, "Owner not exist/found");

  const productImage = req.file?.path;
  // const p= req.files?.productImage[0]?.path;
  console.log("image ",productImage, " files ",req.files);
  if (!productImage) throw new ApiError(400, "Product image not found");

  // const productImgResponse = await uploadOnCloudinary(productImage);
  // if (!productImgResponse) throw new ApiError(500, "Product image not uploaded on Cloudinary");

  const newProduct = await Product.create({
    title,
    category,
    price:price,
    description,
    stock,
    owner: owner._id, // Assuming owner references are by ID
    productImage:  "not found",
    ageCategory
  });

  return res.status(200).json(new ApiResponce(200, newProduct, "New product added successfully"));
});

// Change price function
const changePrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newPrice } = req.body;
  
  if (!newPrice) {
    throw new ApiError(400 , "producr new price required");
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404 , "producr not found");
  }
  const updatedPrice = parseFloat(product.price);
  console.log(updatedPrice, product.price)
  if(updatedPrice > newPrice){
    product.discount= ((updatedPrice - newPrice)*100)/updatedPrice;
  }
  else{
    product.discount =0;
  }

   
    product.price = newPrice;
    console.log(product.price.toString());
    await product.save();

  return   res.status(200).json(200,new ApiResponce(200,  product,'Price updated successfully') );
 
});

const changeStock = asyncHandler(async (req,res)=>{
  const { id } = req.params;
  const { newStock } = req.body;
  if (!newStock) {
    throw new ApiError(400 , "producr new Stock required");
  }
  if(newStock < 0){
    throw new ApiError(400 , "producr Stock cant -ve");
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404 , "producr not found");
  }
  product.stock = newStock;
  await product.save();
  return res.status(200).json(200,new ApiResponce(200,  product,'Stock updated successfully') );
 
})

const getStock = asyncHandler(async (req,res)=>{
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404 , "producr not found");
  }
  return  res.status(200)
  .json(200,new ApiResponce(200,  product.stock,'Stock get successfully') );
})

const addReview = asyncHandler(async (req, res)=>{
  const { id } = req.params;
  const product = await Product.findById(id);
  if(!product) throw new ApiError(404, "product not found");
  
  const {rating , comment } = req.body;
 const user = req.user._id;
  if(!(review && rating)) return null;

  const newReview = { user, rating, comment };
  product.reviews.push(newReview);

  // Update the product's average rating
  const totalRating = product.reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0);
  product.rating = totalRating / product.reviews.length;

  await product.save();

  return  res.status(200)
  .json(200,new ApiResponce(200,  product.review,'Review added successfully') );
  
})

const deleteReview = asyncHandler(async (req, res)=>{
  const { id, reviewId } = req.params;
 
  const product = await Product.findById(id);
  if(!product) throw new ApiError(404, "product not found");
  const reviewIndex =  product.reviews.findIndex((review)=>{
    review._id.toString() === reviewId;
  })
  if (reviewIndex === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }

  product.reviews.splice(reviewIndex, 1);

  // Update the product's average rating
  const totalRating = product.reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0);
  product.rating = product.reviews.length ? totalRating / product.reviews.length : 0;

  await product.save();
  return  res.status(200)
  .json(200,new ApiResponce(200,  product.reviews,'Review deleted successfully') );
  
})

const updateReview= asyncHandler(async (req,res)=>{
  const {id , reviewId} = req.params;
  const {rating, comment} = req.body;
  const product =await Product.findById(id);
  if(!product) throw new ApiError(404, "product not found");

  const reviewIndex= product.reviews.findIndex((review)=>{
              review._id.toString() === reviewId;
  })
  if (reviewIndex === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }
   product.reviews[reviewIndex].rating= rating;
   product.reviews[reviewIndex].comment =comment;

  const totalRating = product.reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0);
  product.rating = totalRating / product.reviews.length;

  product.save();
 return  res.status(200)
  .json(200,new ApiResponce(200,  product.reviews,'Review updated successfully') );
  
})

const getAllReview = asyncHandler(async (req,res)=>{
  const {id} = req.params;

  const product= await Product.findById(id);
  if(!product) throw new ApiError(404, "product not found");

  return res.status(200).json(200, new ApiResponce(200 , product.reviews,"reviwe gert succfully"));
  
})
const getProduct = asyncHandler(async (req,res)=>{
  const {id} = req.params;

  const product= Product.findById(id);
  if(!product) throw new ApiError(404, "product not found");

  return res.status(200).json(200, new ApiResponce(200 , product,"product gert succfully"));
  
})
export {
  addNewProductItem,
  changePrice,
  changeStock,
  getStock,
  addReview,
  deleteReview,
  updateReview,
  getAllReview,
  getProduct
};
