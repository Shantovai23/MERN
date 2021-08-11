import express from "express";
const router = express.Router();

import {protect} from '../middleware/authMiddleware.js'
import {initailPayment,ipn,paymentSucess} from '../controllers/PaymentController.js'

router.route('/:id').get(protect,initailPayment)
router.route('/ipn').post(protect,ipn)
router.route('/success').post(protect,paymentSucess)


export default router