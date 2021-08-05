//ssl
import { PaymentSession } from "ssl-commerz-node";

// for ssl

const tran_id ="_" + Math.random().toString(36).substr(2, 9) + new Date().getTime();

//ssl commerce

const initailPayment = async (req, res) => {
  const payment = new PaymentSession(
    true,
    process.env.STORE_ID,
    process.env.STORE_PASSWORD
  );

  // Set the urls
  payment.setUrls({
    success: "yoursite.com/success", // If payment Succeed
    fail: "yoursite.com/fail", // If payment failed
    cancel: "yoursite.com/cancel", // If user cancel payment
    ipn: "yoursite.com/ipn", // SSLCommerz will send http post request in this link
  });

  // Set order details
  payment.setOrderInfo({
    total_amount: 1670, // Number field
    currency: "BDT", // Must be three character string
    tran_id: tran_id, // Unique Transaction id
    emi_option: 0, // 1 or 0
  });

  // Set customer info
  payment.setCusInfo({
    name: "Simanta Paul",
    email: "simanta@bohubrihi.com",
    add1: "66/A Midtown",
    add2: "Andarkilla",
    city: "Chittagong",
    state: "Optional",
    postcode: 4000,
    country: "Bangladesh",
    phone: "010000000000",
    fax: "Customer_fax_id", 
  });

  // Set shipping info
  payment.setShippingInfo({
    method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
    num_item: 2,
    name: "Simanta Paul",
    add1: "66/A Midtown",
    add2: "Andarkilla",
    city: "Chittagong",
    state: "Optional",
    postcode: 4000,
    country: "Bangladesh",
  });

  // Set Product Profile
  payment.setProductInfo({
    product_name: "Computer",
    product_category: "Electronics",
    product_profile: "general",
  });

  const response = await payment.paymentInit();
  return res.status(200).send(response);
};

export default initailPayment;
