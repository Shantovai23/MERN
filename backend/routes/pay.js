import express from "express";
const router = express.Router();

import {protect} from '../middleware/authMiddleware.js'
import {initailPayment,ipn,paymentSuccess} from '../controllers/PaymentController.js'

router.route('/:id').get(protect,initailPayment)
router.route('/ipn').post(ipn)
router.route('/success').post(paymentSuccess)





export default router