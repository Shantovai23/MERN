//ssl

import { PaymentSession } from "ssl-commerz-node";
import Order from '../models/orderModel.js'


const tran_id ="_" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

//ssl commerce
const initailPayment = async (req, res) => {
   
   
   const orderData=await Order.findById(req.params.id)
   console.log(orderData)
   

    const payment = new PaymentSession(
    true,
    process.env.STORE_ID,
    process.env.STORE_PASSWORD
  );

  // Set the urls
  payment.setUrls({
    success: "https://krishivaibd.herokuapp.com", // If payment Succeed
    fail: "https://krishivaibd.herokuapp.com", // If payment failed
    cancel: "https://krishivaibd.herokuapp.com", // If user cancel payment
    ipn: "https://krishivaibd.herokuapp.com", // SSLCommerz will send http post request in this link
  });

  // Set order details
  payment.setOrderInfo({
    total_amount:orderData.totalPrice, // Number field
    currency: "BDT", // Must be three character string
    tran_id: tran_id, // Unique Transaction id
    emi_option: 0, // 1 or 0
  });

  // Set customer info
  payment.setCusInfo({
    name: req.user.name,
    email: req.user.email,
    add1: 'test',
    add2: 'test',
    city: 'test',
    state: "Optional",
    postcode: 123,
    country: 'test',
    phone: "010000000000",
    fax: "Customer_fax_id", 
  });

  // Set shipping info
  payment.setShippingInfo({
    method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
    num_item: orderData.orderItems.length,
    name:'test',
    add1: 'test',
    add2: 'test',
    city: 'test',
    state: "Optional",
    postcode: 1234,
    country: 'test', 
  });

  // Set Product Profile
  payment.setProductInfo({
    product_name: "General",
    product_category: "General",
    product_profile: "general",
  }); 

 
  let response = await payment.paymentInit();
  await Order.findOneAndUpdate({_id:req.params.id},{isPaid:true})
  return res.status(200).send(response);
 
};

export default initailPayment;
