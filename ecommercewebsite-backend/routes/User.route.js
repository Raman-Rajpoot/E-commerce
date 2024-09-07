import { 
    addCart, 
    deleteUser, 
    getCurrentUser, 
    loggedOut, 
    loginUser, 
    refreshAccessToken, 
    updateFullName,
    updatePassword, 
    updateUserImg, 
    userRegister, 
    removeCartItem, 
    getCartItems, 
    addAndUpdateAddress,
    userLocation
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewere.js";
import { upload } from '../middlewares/multer.middleware.js';
import express from 'express';

const router = express.Router();

router.route("/register").post(
    upload.fields([
        {
            name: "userImage",
            maxCount: 1
        } 
    ]), 
    userRegister 
);
router.route('/login').post(loginUser);

router.route('/logOut').post(verifyJwt ,loggedOut);
router.route('/getCurrentUser').post(verifyJwt ,getCurrentUser);
router.route('/deleteUser').post(verifyJwt ,deleteUser);
router.route('/updateFullName').post(verifyJwt, updateFullName);
router.route('/updatePassword').post(verifyJwt, updatePassword);
router.route('/updateUserImage').patch(verifyJwt,  upload.single("newUserImage"),
updateUserImg);
router.route('/updateAddress').post(verifyJwt, addAndUpdateAddress);
router.get('/getUserInfo', verifyJwt,userLocation );
router.route('/addCart').patch(verifyJwt,  addCart);

router.route('/refreshAccessToken').post(refreshAccessToken);

router.route('/addCart').post(verifyJwt,addCart)
// router.post('/add', verifyJwt, addCartItem);
router.post('/removeCart', verifyJwt, removeCartItem);
router.get('/getCart', verifyJwt, getCartItems);
export default router;