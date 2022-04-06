const router = require("express").Router();
const Product = require("../models/Products.model");

router.get("/product", (req, res, next) => {
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

module.exports = router;
