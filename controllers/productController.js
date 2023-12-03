const express = require("express");
const Product = require("../routes/product");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/add-product", (req, res) => {
  console.log("called");
  const input = req && req.body;

  Product.addProduct(input, function (err, data) {
    if (!err) {
      console.log("Product Created successfully");
      res.send(data);
    } else {
      console.log("Error while creating Product", err);
      res.status(422).json({ errMsg: err });
    }
  });
});

module.exports = router;
