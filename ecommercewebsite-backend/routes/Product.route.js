import { addNewProductItem, addReview, changePrice, changeStock, deleteReview, getAllReview, getCurrentProduct, getFemaleProduct, getKidsProduct, getMaleProduct, getNewCollection, getTrendingProductBTWKids, getTrendingProductBTWWoman, searchBar, updateReview } from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewere.js";
import { upload } from '../middlewares/multer.middleware.js';
import express from 'express';

const productRouter = express.Router();
 
productRouter.route('/addNewItem').post(verifyJwt, upload.single('productImage'),addNewProductItem)
productRouter.route('/changePrice/:id').post(changePrice)
productRouter.route('/getCurrentProduct/:id').get(getCurrentProduct); 
productRouter.route('/changeStock/:id').post(changeStock);
productRouter.route('/addReview/:id').post(verifyJwt,addReview); 
productRouter.route('/deleteReview/:id/:reviewId').post(verifyJwt,deleteReview);
productRouter.route('/updateReview/:id/:reviewId').post(verifyJwt,updateReview);
productRouter.route('/getAllReview/:id').post(getAllReview);


productRouter.route('/getLatestProduct').get(getNewCollection);
productRouter.route('/getMaleProduct').get(getMaleProduct);
productRouter.route('/getFemaleProduct').get(getFemaleProduct);
productRouter.route('/getKidsProduct').get(getKidsProduct);
productRouter.route('/getTrendingKidsProduct').get(getTrendingProductBTWKids);
productRouter.route('/getTrendingFemaleProduct').get(getTrendingProductBTWWoman);
productRouter.route('/search').get(searchBar);

export {productRouter}