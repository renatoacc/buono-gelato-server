const router = require("express").Router();
const Product = require("../models/Products.model");
const Order = require("../models/Orders.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const csrfMiddleware = require("../middlewares/csrfMiddleware");

//list products
router.get("/shop", csrfMiddleware, isLoggedIn, async (req, res, next) => {
  try {
    const listProducts = await Product.find();
    console.log(listProducts);
    res.json(listProducts);
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching products from server! " + err.message,
    });
  }
});

// find one product
router.get(
  "/product/:id",
  csrfMiddleware,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const oneProducts = await Product.findById(id);
      console.log(oneProducts);
      res.json(oneProducts);
    } catch (err) {
      res.status(400).json({
        errorMessage: "Error in fetching products from server! " + err.message,
      });
    }
  }
);

//create order
router.post("/order", csrfMiddleware, isLoggedIn, async (req, res, next) => {
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
    res.json({ message: "Succesfully created order", order: newOrder });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body! " + err.message,
    });
  }
});

module.exports = router;
