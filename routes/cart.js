const express = require("express");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const CartItem = require("../models/helpers/cartItem");
const { default: mongoose } = require("mongoose");

const router = express.Router();

const USER_ID = "64ecf263a040b401d0931145";

router.get("/", async (req, res) => {
    const user = await User.findById(USER_ID);
    res.json(user.cart);
});

router.get("/size", async (req, res) => {
    const user = await User.findById(USER_ID);
    Object.keys(user.cart.contents);
    const contentsSize = Object.keys(user.cart.contents).length;
    res.json(contentsSize);
});

//set quantity
router.put("/", async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        const user = await User.findById(USER_ID);
        mongoose.set("debug", true);

        if (!product) {
            res.send("no item");
        }

        if (!user.cart.contents[productId]) {
            const newCartItem = {
                productId,
                quantity,
            };

            user.cart.contents[productId] = newCartItem;
            user.cart.total = user.cart.total + product.price * quantity;
            console.log(user);
            user.markModified("cart.contents");
            await user.save();
            res.json(`${product._id} added to cart`);
        } else {
            prevQuantity = user.cart.contents[productId].quantity;
            user.cart.contents[productId].quantity = quantity;
            user.cart.total =
                user.cart.total +
                (product.price * quantity - product.price * prevQuantity);
            console.log(user);
            user.markModified("cart.contents");
            await user.save();
            res.json(`${product._id} quantity updated`);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//add or substract from quantity
router.patch("/", async (req, res) => {
    try {
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/", async (req, res) => {
    const user = await User.findById(USER_ID);
    user.cart.total = 0;
    user.cart.contents = {};
    user.markModified("cart.contents");
    await user.save();
    res.json("Cleared user's cart");
});

module.exports = router;
