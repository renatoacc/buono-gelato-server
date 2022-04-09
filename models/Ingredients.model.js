const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  typeIngredient: {
    type: String,
    enum: ["Ice-cream", "Topping", "Crunchy"],
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
});

const Ingredients= model("Ingredient", ingredientSchema);

module.exports = Ingredients;
