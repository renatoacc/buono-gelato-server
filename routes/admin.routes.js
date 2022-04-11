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
  "/showproducts",
  // csrfMiddleware,
  // isLoggedIn,
  // isAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.find();
      res.json( product );
    } catch (err) {
      res.status(400).json({
        errorMessage: "Error in fetching products from server! " + err.message,
      });
    }
  }
);



router.post("/products", singleUpload, async (req, res, next) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>", req.body)
  try {
    const { name, typeProduct, price, extraIngredients, description, productImage } = req.body;
    const newProduct = new Product({
      name,
      typeProduct,
      price,
      description,
      extraIngredients,
      productImage,
    });
    await newProduct.save();
    res.json({ message: "Succesfully created Product", product: newProduct });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body! " + err.message,
    });
  }
});

router.get(
  "/products/:id",
  csrfMiddleware,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const oneProduct = await Product.findById(id);
      //console.log(oneProduct);
      res.json(oneProduct);
    } catch (err) {
      res.status(400).json({
        errorMessage: "Error in fetching products from server! " + err.message,
      });
    }
  }
);

router.put("/products/:id", singleUpload, async (req, res, next) => {
  //console.log(">>>>>>>>>>>>>>>>>>>>>>>", req.file, ">>>>>>>>>>>>>>", req.body);
  //console.log(req.params, req.body)
  try {
    const {id}  = req.params
    const {name, typeProduct, price, description } = req.body;
    // const image = req.file.location;
    if (!id) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a valid _id in your request" });
    }
    
    const afterUpdateProduct = await Product.findByIdAndUpdate(
      id,
      { name, typeProduct, price, description },
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

router.post(
  "/products/delete/:id",

  async (req, res, next) => {
    console.log(">>>>>>>>>>>>>>", req.params);
    try {
      const {id} = req.params;
      await Product.findByIdAndDelete(id);
      res.json({ message: "Successfully delete Product " + id });
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: "Error in deleting Product! " + err.message });
    }
  }
);

//INGREDIENTS ROUTES

router.get(
  "/showingredients",

  async (req, res, next) => {
    try {
      const ingredient = await Ingredients.find();
      res.json( ingredient );
    } catch (err) {
      res.status(400).json({
        errorMessage:
          "Error in fetching ingredients from server! " + err.message,
      });
    }
  }
);
router.get(
  "/ingredients/:id",
  csrfMiddleware,
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      //console.log(id);
      const oneIngredient = await Ingredients.findById(id);
      console.log(oneIngredient);
      res.json(oneIngredient);
    } catch (err) {
      res.status(400).json({
        errorMessage: "Error in fetching ingredients from server! " + err.message,
      });
    }
  }
);

router.post(
  "/ingredients",

  async (req, res, next) => {

    try {
      //console.log( ">>>>>>>>>>>>>>", req.body);
      const { name, typeIngredient, price, description } = req.body;
      const newIngredient = new Ingredients({ name, typeIngredient, price, description });
      await newIngredient.save();
      res.json({
        message: "Succesfully create new Ingredient",
        ingredient: newIngredient,
      });
    } catch (err) {
      res.status(400).json({
        errorMessage: "Please provide correct request body! " + err.message,
      });
    }
  }
);

router.put(
  "/ingredients/:id",
 
  async (req, res, next) => {
    //console.log(req.params)
    try {
    const {id}  = req.params
    const {name, typeIngredient, price, description } = req.body;
      if (!id) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide a valid _id in your request" });
      }
      const afterUpdateIngredient = await Ingredients.findByIdAndUpdate(
        id,
        { name, typeIngredient, price, description },
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

router.post(
  "/ingredients/delete/:id",
  async (req, res, next) => {
    console.log(req.params)
    try {
      const { id } = req.params;
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
  "/orderview",
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
