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
  "/userInfo/:id",
  csrfMiddleware,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await User.findById(id);
      res.json(data);
    } catch (error) {
      console.error("Error take data from the database", error);
    }
  }
);

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
      console.error("Error to get the user data:", error);
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
    const { id } = req.params;
    const { _id, firstName, lastName, cart } = await User.findById(id);
    console.log({ _id, firstName, lastName, cart });
    res.json({ _id, firstName, lastName, cart });
  } catch (error) {
    console.log("Error cart user data", error);
  }
});

router.put("/cartDeleteElement/", isLoggedIn, async (req, res, next) => {
  try {
    const data = req.body;
    console.log("console.log da linha 113 do server side:", data);
    const response = await User.findById(data[0]);
    const fullUserData = response.cart;
    fullUserData.splice(data[2], 1);
    await User.findByIdAndUpdate(data[0], { cart: fullUserData });
    res.json({ message: "delete item successfully!" });
  } catch (error) {
    console.error(error);
  }
});

router.put("/favoritAdd", isLoggedIn, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await User.findById(data[0]);
    console.log(data[1]);
    const favortiArray = response.favourites;
    favortiArray.push(data[1]);
    await User.findByIdAndUpdate(data[0], { favourites: favortiArray });
  } catch (error) {
    console.error(error);
  }
});

router.put("/favoriteRemove/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Console.log ID form 140:", id);
    const userId = req.session.user._id;
    const response = await User.findById(userId);
    let removeIndex = null;
    response.favourites.forEach((element, index) => {
      if (element._id.includes(id)) {
        removeIndex = index;
        return;
      }
    });
    console.log("Console.log Remove Index form 146:", removeIndex);
    response.favourites.splice(removeIndex, 1);
    await response.save();
  } catch (error) {
    console.error(error);
  }
});

router.get("/listFavorit/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await User.findById(id);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

router.put("/deleteCart/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { cart: [] });
    res.json({ message: "Cart delete Successfully." });
  } catch (error) {
    console.error(error);
  }
});

//create order
router.post("/order", csrfMiddleware, isLoggedIn, async (req, res, next) => {
  try {
    const data = req.body;
    console.log("Data to Order: ", data);
    const newOrder = new Order({
      clientName: data.firstName + " " + data.lastName,
      products: data.cart,
      checkout: false,
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
