import express from "express";
const router = express.Router();

import {protect} from '../middleware/authMiddleware.js'
import {initailPayment,ipn} from '../controllers/PaymentController.js'

router.route('/:id').get(protect,initailPayment)
router.route('/ipn').post(protect,ipn)



export default router