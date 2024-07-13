import { addNewProductItem, changePrice, changeStock, getStock } from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewere.js";
import { upload } from '../middlewares/multer.middleware.js';
import express from 'express';

const productRouter = express.Router();
 
productRouter.route('/addNewItem').post(verifyJwt, upload.single('productImage'),addNewProductItem)
// productRouter.post('/addNewItem', upload.single('productImage'), (req, res) => {
//     console.log('Form Data:', req.body); // Ensure this logs the form data
//     console.log('File:', req.file);      // Ensure this logs the file data
//     res.send('Form data route working!');
// });
productRouter.route('/changePrice/:id').post(changePrice)
productRouter.route('/getStock/:id').get(getStock);
productRouter.route('/changeStock/:id').post(changeStock);

export {productRouter}