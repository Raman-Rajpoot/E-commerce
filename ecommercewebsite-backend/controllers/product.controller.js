import { asyncHandler } from '../utils/asynHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponce } from '../utils/ApiResponce.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Product } from '../models/product.model.js';
import { Owner } from '../models/owner.product.model.js';
import { cache } from '../src/app.js';
import mongoose from 'mongoose';




const addNewProductItem = asyncHandler(async (req, res) => {
  const { title, category, price, description, stock, ageCategory } = req.body;
  

  if (!(title && category && price && description && stock && ageCategory)) {
    throw new ApiError(404, 'Product required information is missing');
  }

  const user = await User.findById(req.user?._id).select('-password -refreshToken');
  if (!user) throw new ApiError(404, "Owner not exist/found");

  const owner = await Owner.findOne({ userInfo: user._id });
  if (!owner) throw new ApiError(404, "Owner not exist/found");

  const productImage = req.file?.path;
  if (!productImage) throw new ApiError(400, "Product image not found");
   const newProduct = await Product.create({
    title,
    category,
    price:price,
    description,
    stock,
    owner: owner._id, 
    productImage:  "not found",
    ageCategory
  });

  return res.status(200).json(new ApiResponce(200, newProduct, "New product added successfully"));
});


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
  if(updatedPrice > newPrice){
    product.discount= ((updatedPrice - newPrice)*100)/updatedPrice;
  }
  else{
    product.discount =0;
  }

   
    product.price = newPrice;
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

const getCurrentProduct = asyncHandler(async (req,res)=>{
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404 , "producr not found");
  }
  return  res.status(200)
  .json(200,new ApiResponce(200,  product,'Stock get successfully') );
})

const addReview = asyncHandler(async (req, res)=>{
  const {id} = req.params;
  const product = await Product.findById(id);
  if(!product) throw new ApiError(404, "product not found");
  
  const {rating , comment } = req.body;
 const user = req.user?._id;
  if(!(comment && rating)) return null;

  const newReview = { user, rating, comment };
  product.reviews.push(newReview);

  // Update the product's average rating
  const totalRating = product.reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0);
  product.rating = totalRating / product.reviews.length;

  await product.save();

  return  res.status(200)
  .json(200,new ApiResponce(200,  product.reviews,'Review added successfully') );
  
})

const deleteReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;
 
  // Find the product by id
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Find the index of the review in the product's reviews array
  const reviewIndex = product.reviews.findIndex((review) => review._id.toString() === reviewId);
  if (reviewIndex === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }
  console.log(product.reviews[reviewIndex]?.user?._id,"   ", req.user?._id)
  if(product.reviews[reviewIndex]?.user?._id.toString() !== req.user?._id.toString()){
    console.log("ERROR  ....")
    throw new ApiError(404, "unauthorized user");
  }
  // Remove the review from the reviews array
  product.reviews.splice(reviewIndex, 1);

  // Update the product's average rating
  const totalRating = product.reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0);
  product.rating = product.reviews.length ? totalRating / product.reviews.length : 0;

  // Save the updated product
  await product.save();

  // Respond with success message and updated reviews
  return res.status(200).json(new ApiResponce(200, product.reviews, 'Review deleted successfully'));
});


const updateReview= asyncHandler(async (req,res)=>{
  const {id , reviewId} = req.params;
  const {rating, comment} = req.body;
  const product =await Product.findById(id);
  if(!product) throw new ApiError(404, "product not found");

  const reviewIndex = product.reviews.findIndex((review) => review._id.toString() === reviewId);
  if (reviewIndex === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }
  if(product.reviews[reviewIndex]?.user?._id.toString() !== req.user?._id.toString()){
    console.log("ERROR  ....")
    throw new ApiError(404, "unauthorized user");
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

const getNewCollection = asyncHandler(async (req,res)=>{
  const key = 'latest_collection';
  
  let product ;
  if (cache.has(key)) {
    // If data exists in cache
    
    product= JSON.parse(cache.get(key));
  }else{
   product = (await Product.find({}).sort({createdAt: -1})).limit(8);
  cache.set(key,JSON.stringify(product));
  }
  return res.status(200).json(200 , new ApiResponce(200, product, "latest collection get successfully"));
})

const getMaleProduct = asyncHandler(async (req,res)=>{ 
 const product = await Product.find({
    category: "male"
  }).sort({stock : 1});

  return res.status(200).json(200, new ApiResponce(200 , product,"product get succfully"));
  
})
const getFemaleProduct = asyncHandler(async (req,res)=>{ 
  const product = await Product.find({
     category: "female"
   }).sort({stock : 1});
   return res.status(200).json(200, new ApiResponce(200 , product,"product get succfully"));
   
 })
 const getKidsProduct = asyncHandler(async (req,res)=>{ 
  const product = await Product.find({
     category: "kids"
   }).sort({stock : 1});
   return res.status(200).json(200, new ApiResponce(200 , product,"product get succfully"));
   
 })

const getTrendingProductBTWKids = asyncHandler(async (req,res)=>{
  const product = await Product.find({
    category: "kids"
  }).sort({rating : 1}).limit(10);
  return res.status(200).json(200, new ApiResponce(200 , product,"product get succfully"));
  
})


const getTrendingProductBTWWoman = asyncHandler(async (req,res)=>{
  const product = await Product.find({
    category: "female"
  }).sort({rating : 1}).limit(10);
  return res.status(200).json(200, new ApiResponce(200 , product,"product get succfully"));
  
})

const searchBar = asyncHandler(async (req, res)=>{
  const { q } = req.query;
  
    const products = await Product.find({
      $or: [ 
        { name: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') }
      ]
    });

   return  res.status(200).json(200, new ApiResponce(200, products));
})
const filterProduct = asyncHandler(async (req, res)=>{
  const {sort} = req.body;
  const products = await Product.find({
    $or: [ 
      { name: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') },
      { category: new RegExp(q, 'i') }
    ]
  }).sort({price : sort});

  return res.status(200).json(200, new ApiResponce(200, products));
})
export {
  addNewProductItem,
  changePrice,
  changeStock,
  getCurrentProduct,
  addReview,
  deleteReview,
  updateReview,
  getAllReview,
  getNewCollection,
  getMaleProduct,
  getFemaleProduct,
  getKidsProduct,
  getTrendingProductBTWKids,
  getTrendingProductBTWWoman,
  searchBar,
  filterProduct
};
