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


router.get("/userInfo/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);
    res.json(data);
  } catch (error) {
    console.error("Error take data from the database", error);
  }
});


router.get("/datauser/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id, firstName, lastName, cart } = await User.findById(id);
    const oneUserData = { _id, firstName, lastName, cart };
    res.json(oneUserData);
  } catch (error) {
    console.error("Error to get the user data:", error);
  }
});

// Update cart Array
router.put("/addCart", isLoggedIn, async (req, res, next) => {
  try {
    const { _id, cart } = req.body;
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
router.get("/shop", isLoggedIn, async (req, res, next) => {
  try {
    const listProducts = await Product.find();
    res.json(listProducts);
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching products from server! " + err.message,
    });
  }
});

// find one product
router.get("/product/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneProducts = await Product.findById(id);
    res.json(oneProducts);
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching products from server! " + err.message,
    });
  }
});

// Show cart user information to checkout

router.get("/cart:id",  isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id, firstName, lastName, cart } = await User.findById(id);
    res.json({ _id, firstName, lastName, cart });
  } catch (error) {
    console.error("Error cart user data", error);
  }
});

router.put("/cartDeleteElement/", isLoggedIn, async (req, res, next) => {
  try {
    const { index } = req.body;
    console.log(index);
    const userId = req.session.user._id;
    const response = await User.findById(userId);
    const fullUserData = response.cart;
    fullUserData.splice(index, 1);
    const updateCart = await User.findByIdAndUpdate(userId, {
      cart: fullUserData,
    });
    res.json(updateCart);
  } catch (error) {
    console.error(error);
  }
});

router.put("/favoritAdd", isLoggedIn, async (req, res, next) => {
  try {
    const data = req.body;
    const userId = req.session.user._id;
    const userDataForUpdateFavorite = await User.findById(userId);
    const favortiArray = userDataForUpdateFavorite.favourites;
    let filterArray = null;
    favortiArray.forEach((elem) => {
      if (elem._id === data._id) {
        return (filterArray = true);
      }
    });
    if (!filterArray) {
      favortiArray.push(data);
      const updateUser = await userDataForUpdateFavorite.save();
      res.json(updateUser);
    }
  } catch (error) {
    console.error(error);
  }
});

router.put("/favoriteRemove/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.session.user._id;
    const response = await User.findById(userId);
    let removeIndex = null;
    response.favourites.forEach((element, index) => {
      if (element._id.includes(id)) {
        removeIndex = index;
        return;
      }
    });
    response.favourites.splice(removeIndex, 1);
    await response.save();
    res.json(true);
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
router.post("/order", isLoggedIn, async (req, res, next) => {
  try {
    const data = req.body;
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
