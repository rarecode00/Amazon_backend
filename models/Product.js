const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     name: {
        type: String,
        unqiue: true,
        required: true
     },
     category:{
        type: String,
        required:true
     },
     rating:{
        type: Number,
        required:true
     },
     brand:{
        type: String,
        required:true
     },
     color:{
        type: Array
     },
     price:{
        type:Number,
        required:true
     },
     url:{
        type: String
     }
})

module.exports = mongoose.model('Product' , productSchema)