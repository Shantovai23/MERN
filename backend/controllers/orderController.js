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





//fetch order by id
//GET/api/orders/:id
//access private
const getOrderById = asyncHandler(async (req, res) => {
 const order=await Order.findById(req.params.id).populate('user','name email')
 if(order){
   res.json(order)
 }else{
   res.status(401)
   throw new Error('Order not found')
 }
});

export {addOrderItems,getOrderById}
