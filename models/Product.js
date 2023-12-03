const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unqiue: true,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
    },
    brand: {
      type: String,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
    },
    url: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
