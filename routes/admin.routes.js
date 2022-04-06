const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const Ingredients = require("../models/Ingredients.model");
const Product = require("../models/Products.model");


//PRODUCTS ROUTES

router.get("/products", isLoggedIn, async (req, res, next) => {
    try {
        const product = await Product.find();
        res.json({ product });
    } catch (err) {
        res.status(400).json({
            errorMessage: "Error in fetching products from server! " + err.message,
        });
    }
});

router.post("/products", isLoggedIn, async (req, res, next) => {
    try {
        const { name, typeProduct, price, extraIngredients } = req.body;
        const newProduct = new Product({ name, typeProduct, price, extraIngredients });
        await newProduct.save();
        res.json({ message: "Succesfully created Product", product: newProduct });
    } catch (err) {
        res.status(400).json({
            errorMessage: "Please provide correct request body! " + err.message,
        });
    }
});


router.put("/products", isLoggedIn, async (req, res, next) => {
    try {
        const { _id, name, typeProduct, price, extraIngredients } = req.body;
        if (!_id) {
            return res
                .status(400)
                .json({ errorMessage: "Please provide a valid _id in your request" });
        }
        const afterUpdateProduct = await Product.findByIdAndUpdate(
            _id,
            { name, typeProduct, price, extraIngredients },
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

router.delete("/products", isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);
        res.json({ message: "Successfully delete Product" + id });
    } catch (err) {
        res
            .status(400)
            .json({ errorMessage: "Error in deleting Product! " + err.message });
    }

});

//INGREDIENTS ROUTES

router.get("/ingredients", isLoggedIn, async (req, res, next) => {
    try {
        const ingredient = await Ingredients.find();
        res.json({ ingredient });
    } catch (err) {
        res.status(400).json({
            errorMessage: "Error in fetching ingredients from server! " + err.message,
        });
    }
});

router.post("/ingredients", isLoggedIn, async (req, res, next) => {
    try {
        const { name, typeProduct, price } = req.body;
        const newIngredient = new Product({ name, typeProduct, price });
        await newIngredient.save();
        res.json({ message: "Succesfully create new Ingredient", product: newIngredient });
    } catch (err) {
        res.status(400).json({
            errorMessage: "Please provide correct request body! " + err.message,
        });
    }
});

router.put("/ingredients", isLoggedIn, async (req, res, next) => {
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
});

router.delete("/ingredients", isLoggedIn, async (req, res, next) => {
    try {
        const { id } = req.body;
        await Ingredients.findByIdAndDelete(id);
        res.json({ message: "Successfully delete ingredient" + id });
    } catch (err) {
        res
            .status(400)
            .json({ errorMessage: "Error in deleting ingredient! " + err.message });
    }

});
    module.exports = router;
