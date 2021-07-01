import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//create new order
//GET/api/orders
//access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if(orderItems && orderItems.length==0){
      res.status(401)  //bad rqst
      throw new Error('No Items')
      return
  }else{
      const order=new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })

      const createdOrder=await order.save()
      res.status(201).json(createdOrder) //something created
  }
});

export {addOrderItems}
