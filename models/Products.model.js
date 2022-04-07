const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");


const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  typeProduct: {
    type: String,
    enum: ["Crepe", "Waffle", "Bubble Waffle"],
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  extraIngredients: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredients",
  },
  productImage: {
    type: String,
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
