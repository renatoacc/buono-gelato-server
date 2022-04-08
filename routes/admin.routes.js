const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Ingredients = require("../models/Ingredients.model");
const Product = require("../models/Products.model");
const Orders = require("../models/Orders.model");
const isAdmin = require("../middlewares/isAdmin");
const csrfMiddleware = require("../middlewares/csrfMiddleware");

const upload = require("../middlewares/uploadImage");
const singleUpload = upload.single("productImage");

//PRODUCTS ROUTES

router.get(
  "/products",
  csrfMiddleware,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.find();
      res.json({ product });
    } catch (err) {
      res.status(400).json({
        errorMessage: "Error in fetching products from server! " + err.message,
      });
    }
  }
);

router.post("/products", singleUpload, async (req, res, next) => {
  //console.log(">>>>>>>>>>>>>>>>>>>>>>>",  req.file.location)
  try {
    const { name, typeProduct, price, extraIngredients } = req.body;
    const newProduct = new Product({
      name,
      typeProduct,
      price,
      extraIngredients,
      productImage: req.file.location,
    });
    await newProduct.save();
    res.json({ message: "Succesfully created Product", product: newProduct });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body! " + err.message,
    });
  }
});

router.put("/products", singleUpload, async (req, res, next) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>", req.file, ">>>>>>>>>>>>>>", req.body);
  try {
    const { _id, name, typeProduct, price, extraIngredients } = req.body;
    const image = req.file.location;
    if (!_id) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a valid _id in your request" });
    }
    const afterUpdateProduct = await Product.findByIdAndUpdate(
      _id,
      { name, typeProduct, price, extraIngredients, productImage: image },
      { new: true }
    );
    res.json({
      message: "Successfully updated product!",
      updatedProduct: afterUpdateProduct,
    });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in updating product! " + err.message });
  }
});

router.delete(
  "/products",
  csrfMiddleware,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.body;
      await Product.findByIdAndDelete(id);
      res.json({ message: "Successfully delete Product" + id });
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Error in deleting Product! " + err.message });
    }
  }
);

//INGREDIENTS ROUTES

router.get(
  "/ingredients",
  csrfMiddleware,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const ingredient = await Ingredients.find();
      res.json({ ingredient });
    } catch (err) {
      res.status(400).json({
        errorMessage:
          "Error in fetching ingredients from server! " + err.message,
      });
    }
  }
);

router.post(
  "/ingredients",
  csrfMiddleware,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const { name, typeProduct, price } = req.body;
      const newIngredient = new Product({ name, typeProduct, price });
      await newIngredient.save();
      res.json({
        message: "Succesfully create new Ingredient",
        product: newIngredient,
      });
    } catch (err) {
      res.status(400).json({
        errorMessage: "Please provide correct request body! " + err.message,
      });
    }
  }
);

router.put(
  "/ingredients",
  csrfMiddleware,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const { _id, name, typeProduct, price } = req.body;
      if (!_id) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide a valid _id in your request" });
      }
      const afterUpdateIngredient = await Ingredients.findByIdAndUpdate(
        _id,
        { name, typeProduct, price },
        { new: true }
      );
      res.json({
        message: "Successfully updated ingredient!",
        updatedIngredient: afterUpdateIngredient,
      });
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Error in updating ingredient! " + err.message });
    }
  }
);

router.delete(
  "/ingredients",
  csrfMiddleware,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.body;
      await Ingredients.findByIdAndDelete(id);
      res.json({ message: "Successfully delete ingredient" + id });
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Error in deleting ingredient! " + err.message });
    }
  }
);

//ORDERS ROUTES

router.get(
  "/vieworders",
  csrfMiddleware,
  isLoggedIn,
  isAdmin,
  async (req, res, next) => {
    try {
      const orders = await Orders.find();
      res.json({ orders });
    } catch (err) {
      res.status(400).json({
        errorMessage: "Error in fetching orders from server! " + err.message,
      });
    }
  }
);

module.exports = router;
