const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require('../models/Product')
const fetchuser = require("../middleware/fetchuser");

// Router 1: Add items to the cart

router.post("/add-cart/:id", fetchuser, async (req, res) => {
  try {
    const { cartItem, total } = req.body;

    let findProduct = Product.findById({id: req.params.id});

    if(!findProduct){
      return res.status(400).json({success: false , message: "Product doesn't exists"});      
    }


    
    let cart = new Cart({
      user: req.user.id,
      total,
      cartItem: [
        {
          productId: findProduct.id,
          quantity: cartItem.quantity,
        },
      ],
    });
    
    console.log(req.params.id);
    const saveCart = await cart.save();

    res.json({ success: true, message: "Cart Added Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});


// -------------------------END of Router 1 --------------------------------------

// Router 2: Fetch all the Cart Products

router.get("/get-cart", fetchuser, async (req, res) => {
  try {
    let id = req.user.id;
    let cartItems = await Cart.find({ user: id });
    res.json({ success: true, cartItems: cartItems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

router.put("/update-cart/:id", fetchuser, async (req, res) => {
  try {
    const { id } = req.params; // id is productId
    const { user } = req; // fetchuser middleware sets the user property in the request object
    
    // Find the cart item for the user and product
    const cartItem = await Cart.findOne({ user: user.id, "cartItem.productId": id });
    
    if (!cartItem) {
      // If cart item is not found, return an error response
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }
    
    // Update the cart item quantity
    cartItem.cartItem.forEach(item => {
      if (item.productId.toString() === id.toString()) {
        item.quantity = req.body.quantity;
      }
    });
    
    // Calculate the total price of all cart items
    const total = cartItem.cartItem.reduce((sum, item) => sum + (item.quantity * item.productPrice), 0);
    
    // Save the updated cart item and total price
    await cartItem.save();
    
    // Return a success response with the updated cart item and total price
    res.status(200).json({ success: true, cartItem, total });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});


module.exports = router;
