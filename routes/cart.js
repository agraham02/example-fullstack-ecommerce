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
    const items = Object.values(user.cart.contents);
    let total = 0;
    for (const item of items) {
        total += item.quantity;
    }
    // const contentsSize = Object.keys(user.cart.contents).length;
    res.json(total);
});

//set quantity
router.put("/", async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        const user = await User.findById(USER_ID);

        if (!product) {
            res.send("no item");
        }

        if (!user.cart.contents[productId]) {
            const newCartItem = {
                productId,
                quantity,
            };

            user.cart.contents[productId] = newCartItem;
            const newTotal = user.cart.total + product.price * quantity;
            user.cart.total =
                Math.round((newTotal + Number.EPSILON) * 100) / 100;
            console.log(user);
            user.markModified("cart.contents");
            await user.save();
            res.json(`${product._id} added to cart`);
        } else {
            prevQuantity = user.cart.contents[productId].quantity;
            user.cart.contents[productId].quantity = quantity;
            const newTotal =
                user.cart.total +
                (product.price * quantity - product.price * prevQuantity);
            user.cart.total =
                Math.round((newTotal + Number.EPSILON) * 100) / 100;
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
// TODO
router.patch("/add", async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);
        const user = await User.findById(USER_ID);

        if (!product) {
            res.send("no item");
        }

        if (!user.cart.contents[productId]) {
            const newCartItem = {
                productId,
                quantity: 1,
            };

            user.cart.contents[productId] = newCartItem;
            const newTotal = user.cart.total + product.price;
            user.cart.total =
                Math.round((newTotal + Number.EPSILON) * 100) / 100;
            console.log(user);
            user.markModified("cart.contents");
            await user.save();
            res.json(`${product._id} added to cart`);
        } else {
            prevQuantity = user.cart.contents[productId].quantity;
            user.cart.contents[productId].quantity = prevQuantity + 1;
            const newTotal = user.cart.total + product.price;
            user.cart.total =
                Math.round((newTotal + Number.EPSILON) * 100) / 100;
            console.log(user);
            user.markModified("cart.contents");
            await user.save();
            res.json(`${product._id} quantity updated`);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch("/subtract", async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);
        const user = await User.findById(USER_ID);

        if (!product || !user.cart.contents[productId]) {
            res.send("no item");
        }

        if (user.cart.contents[productId].quantity <= 1) {
            const amountToRemoveFromPrice =
                user.cart.contents[productId].quantity * product.price;
            const newTotal = user.cart.total - amountToRemoveFromPrice;
            user.cart.total =
                Math.round((newTotal + Number.EPSILON) * 100) / 100;

            delete user.cart.contents[productId];
            user.markModified("cart.contents");
            await user.save();
            res.json(`${product._id} removed from cart`);
        } else {
            prevQuantity = user.cart.contents[productId].quantity;
            user.cart.contents[productId].quantity = prevQuantity - 1;
            const newTotal = user.cart.total - product.price;
            user.cart.total =
                Math.round((newTotal + Number.EPSILON) * 100) / 100;
            console.log(user);
            user.markModified("cart.contents");
            await user.save();
            res.json(`${product._id} quantity updated`);
        }
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

router.delete("/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(productId);
        const product = await Product.findById(productId);
        const user = await User.findById(USER_ID);

        if (!product) {
            res.send("no item");
        }

        const amountToRemoveFromPrice =
            user.cart.contents[productId].quantity * product.price;
        const newTotal = user.cart.total - amountToRemoveFromPrice;
        user.cart.total = Math.round((newTotal + Number.EPSILON) * 100) / 100;

        delete user.cart.contents[productId];
        user.markModified("cart.contents");
        await user.save();
        res.json(`${product._id} removed from cart`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
