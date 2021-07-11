import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Fetch all Products
//GET/api/products
//access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // throw new Error('Error!')
  res.json(products);
});

//Fetch single Product
//GET/api/products/:id
//access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//delete Product
//DELETE/api/products/:id
//access admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//create Product
//POST/api/product
//access admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description:"sample decription",
  });

  const createdProduct = await product.save();
  res.status(201);
  res.json(createdProduct);
});

//update Product
//PUT/api/products/:id
//access admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;

  const product=await Product.findById(req.params.id)

  if(product){

    product.name=name
    product.price=price
    product.image=image
    product.category=category
    product.brand=brand
    product.countInStock=countInStock
    product.description=description

  const updatedProduct = await product.save();
  res.json(updatedProduct);
  }else{
    res.status(404)
    throw new Error('Product Not Found')
  }

});

export { getProductById, getProducts, deleteProduct ,updateProduct,createProduct};
