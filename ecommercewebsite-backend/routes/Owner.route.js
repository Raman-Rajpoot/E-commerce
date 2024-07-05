import { newOwner } from "../controllers/owner.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewere.js";
import { upload } from '../middlewares/multer.middleware.js';
import express from 'express';

const ownerRouter = express.Router();

ownerRouter.route("/registerNewOwner").post(verifyJwt,newOwner);

export default ownerRouter;