import express from "express";
const router = express.Router();

import {protect} from '../middleware/authMiddleware.js'
import {initailPayment,paymentSuccess,paymentFailed} from '../controllers/PaymentController.js'

router.route('/:id').get(protect,initailPayment)

router.route('/success').post(paymentSuccess)
router.route('/fail').post(paymentFailed)





export default router