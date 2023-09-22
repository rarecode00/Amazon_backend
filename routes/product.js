const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const mongoose = require("mongoose");
// Router 1: To Create the Product---------------------------------------------------------

router.post("/add-product", async (req, res) => {
  try {
    const { name, category, rating, brand, color, price, url } = req.body;
    const findProduct = await Product.find({ name });
    if (findProduct.length > 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Product already exists with this Name",
        });
    }
    const newProduct = new Product({
      name,
      category,
      rating,
      brand,
      color,
      price,
      url,
    });

    const saveProduct = await newProduct.save();
    return res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// --------------------------------END OF ROUTER 1---------------------------------------------

// Router 2: To update the Product--------------------------------------------------------------

router.put("/update-product/:id", async (req, res) => {
  try {
    const { name, category, rating, brand, color, price, url } = req.body;
    const newProduct = {};
    Object.entries({
      name,
      category,
      rating,
      brand,
      color,
      price,
      url,
    }).forEach(([key, value]) => {
      if (value !== null) {
        newProduct[key] = value;
      }
    });

    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product with this ID not found" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, newProduct, {
      new: true,
    });

    return res.json({ success: true, message: "Product Updated SuccessFully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// --------------------------------END OF ROUTER 2---------------------------------------------

// Router 3: To get all the products

router.get("/fetch-products", async (req, res) => {
  try {
    const products = await Product.find();
    return res.json({ success: true, products: products });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
