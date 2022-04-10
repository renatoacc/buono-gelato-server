const router = require("express").Router();
const Product = require("../models/Products.model");
const User = require("../models/User.model");
const Order = require("../models/Orders.model");
const isLoggedIn = require("../middlewares/isLoggedIn");
const csrfMiddleware = require("../middlewares/csrfMiddleware");
const Orders = require("../models/Orders.model");

// check if the user have the session
router.get("/logged", async (req, res, next) => {
  try {
    req.session.user ? res.json(req.session.user) : res.json(null);
  } catch (error) {
    console.error(error);
  }
});

router.get(
  "/datauser/:id",
  csrfMiddleware,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("Get user id:", id);
      const { _id, firstName, lastName, cart } = await User.findById(id);
      const oneUserData = { _id, firstName, lastName, cart };
      res.json(oneUserData);
    } catch (error) {
      console.error("Erro to get the user data:", error);
    }
  }
);
// Update cart Array
router.put("/addCart", isLoggedIn, async (req, res, next) => {
  try {
    const { _id, cart } = req.body;
    console.log("Data form the front end", _id, cart);
    if (!_id) {
      return res.status(400).json({ errorMessage: "Error ID" });
    }
    await User.findByIdAndUpdate(_id, { cart: cart });
    res.json({ message: "Cart update Successfully." });
  } catch (error) {
    res.status(400).json({ errorMessage: "Erro Update Cart" });
  }
});

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

// Show cart user information to checkout

router.get("/cart:id", csrfMiddleware, isLoggedIn, async (req, res, next) => {
  try {
    console.log("ajkhsdkjahskdjahkdjshakjdshkj", req.params);
    const { id } = req.params;
    const { _id, firstName, lastName, cart } = await User.findById(id);
    console.log({ _id, firstName, lastName, cart });
    res.json({ _id, firstName, lastName, cart });
  } catch (error) {
    console.log("Error cart user data", error);
  }
});

// creat get to check the number of the order.
router.get(
  "/number/order",
  csrfMiddleware,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { orderNumberArray } = Orders.find();
      console.log("TOTAL ORDER", orderNumberArray);
      res.json(orderNumberArray);
    } catch (error) {
      console.log("Error get Order Number: ", error);
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
