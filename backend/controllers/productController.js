import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Fetch all Products
//GET/api/products
//access public
const getProducts= asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    // throw new Error('Error!')
    res.json(products);
})



//Fetch single Product
//GET/api/products/:id
//access public
const getProductById= asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
})

export {getProductById,getProducts}