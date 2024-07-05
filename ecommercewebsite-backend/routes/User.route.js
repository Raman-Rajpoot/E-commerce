import { addCart, loggedOut, loginUser, refreshAccessToken, updateFullName, updatePassword, updateUserImg, userRegister } from "../controllers/user.controller.js"
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

router.route('/updateFullName').post(verifyJwt, updateFullName);
router.route('/updatePassword').post(verifyJwt, updatePassword);
router.route('/updateUserImage').patch(verifyJwt,  upload.single("newUserImage"),
updateUserImg );


router.route('/refreshAccessToken').post(refreshAccessToken);

router.route('/addCart').post(verifyJwt,addCart)
export default router;