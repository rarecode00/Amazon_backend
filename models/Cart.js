const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
   },
    cartItem:[
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number            
        }
    ],
    total: Number
});

module.exports = mongoose.model('Cart' , cartSchema)