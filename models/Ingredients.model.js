const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  typeProduct: {
    type: String,
    enum: ["Ice-cream", "Topping", "Crunchy"],
    required: true,
  },
  discription: String,
  price: {
    type: Number,
    required: true,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
