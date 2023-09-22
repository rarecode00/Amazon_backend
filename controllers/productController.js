const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
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
};
