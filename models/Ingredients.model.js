const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
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

const Ingredients = model("Ingredient", ingredientSchema);

module.exports = Ingredients;
