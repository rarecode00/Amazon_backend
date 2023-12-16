const express = require("express");
const Product = require("../models/Product");
// Router 1: To Create the Product---------------------------------------------------------

module.exports = {
  addProduct: function (input, cb) {
    const data = getFilteredData(input);
    if (!data.name) {
      return cb("Product Name Doesn't exists", null);
    }

    Product.findOne({ name: data.name })
      .then((data) => {
        if (!data) {
          Product.create(data)
            .then((created) => {
              cb(null, created);
            })
            .catch((err) => {
              cb(err, null);
            });
        } else {
          cb("Product is already Exists", null);
        }
      })
      .catch((err) => {
        console.log("Error while findone the product");
      });
  },
  getAllProduct: function (cb) {
    Product.find({})
      .then((data) => {
        cb(null, data);
      })
      .catch((err) => {
        cb(err, null);
      });
  },
};

var getFilteredData = function (input) {
  if (!input) return {};
  const data = {};
  if (input.name == "") {
    data.name = null;
  }

  if (input.name != "") {
    data.name = input.name;
  }

  if (input.category != "") {
    data.category = input.category;
  }

  if (input.price != "") {
    data.price = input.price;
  }

  if (input.rating != "") {
    data.rating = input.rating;
  }

  return data;
};

// --------------------------------END OF ROUTER 1---------------------------------------------

// Router 2: To update the Product--------------------------------------------------------------

// router.put("/update-product/:id", async (req, res) => {
//   try {
//     const { name, category, rating, brand, color, price, url } = req.body;
//     const newProduct = {};
//     Object.entries({
//       name,
//       category,
//       rating,
//       brand,
//       color,
//       price,
//       url,
//     }).forEach(([key, value]) => {
//       if (value !== null) {
//         newProduct[key] = value;
//       }
//     });

//     let product = await Product.findById(req.params.id);
//     if (!product) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Product with this ID not found" });
//     }

//     product = await Product.findByIdAndUpdate(req.params.id, newProduct, {
//       new: true,
//     });

//     return res.json({ success: true, message: "Product Updated SuccessFully" });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// });

// --------------------------------END OF ROUTER 2---------------------------------------------

// Router 3: To get all the products

// router.get("/fetch-products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     return res.json({ success: true, products: products });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// });
