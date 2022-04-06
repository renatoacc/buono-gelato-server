const router = require("express").Router();
const Product = require("../models/Products.model");
const Order = require("../models/Orders.model");
const isLoggedIn = require("../middlewares/isLoggedIn");

//list products
router.get("/shop", isLoggedIn, (req, res, next) => {
  try {
    const listProducts = Product.find();
    res.json({ listProducts });
    console.log(listProducts);
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching products from server! " + err.message,
    });
  }
});

//create order
router.post("/order", isLoggedIn, async (req, res, next) => {
  try {
    const { number, clientName, products, quantity, checkout } = req.body;
    const newOrder = new Order({
      number,
      clientName,
      products,
      quantity,
      checkout,
    });
    await newOrder.save();
    res.json({ message: "Succesfully created todo", todo: newOrder });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body! " + err.message,
    });
  }
});

module.exports = router;
