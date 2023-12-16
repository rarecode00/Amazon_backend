const express = require("express");
const Product = require("../routes/product");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/add-product", (req, res) => {
  const input = req && req.body;

  Product.addProduct(input, function (err, data) {
    if (!err) {
      console.log("Product Created successfully");
      res.send(data);
    } else {
      res.status(422).json({ errMsg: err });
    }
  });
});

router.get("/getAllProduct", (req, res) => {
  Product.getAllProduct(function (err, data) {
    if (!err && data) {
      res.json(data);
    } else {
      res.status(422).json({ errMsg: err });
    }
  });
});

module.exports = router;
