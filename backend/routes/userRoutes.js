import express from "express";
const router = express.Router();
import {authUser,getUserProfile,registerUser} from '../controllers/userControllers.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/').post(registerUser)
router.route('/profile').get(protect,getUserProfile)
router.post('/users',registerUser)


export default router;