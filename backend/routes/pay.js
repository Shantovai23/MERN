import express from "express";
const router = express.Router();

import {protect} from '../middleware/authMiddleware.js'
import initailPayment from '../controllers/PaymentController.js'

router.route('/:id').get(protect,initailPayment)

export default router