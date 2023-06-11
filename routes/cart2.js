const express = require("express");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const CartItem = require("../models/helpers/cartItem");

const router = express.Router();

const USER_ID = "648562298ad300ba11e70009";

router.get("/", async (req, res) => {
    const user = await User.findById(USER_ID);
    res.json(user.cart);
});

router.get("/length", async (req, res) => {
    const user = await User.findById(USER_ID);
    res.json(user.cart.contents.length);
});

//set quantity
router.put("/", async (req, res) => {

})

//add or substract from quantity
router.patch("/", async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const usedQuantity = quantity || 1;
        const product = await Product.findById(productId);
        const user = await User.findById(USER_ID);

        for (let i = 0; i < user.cart.contents.length; i++) {
            if (product._id.equals(user.cart.contents[i].productId)) {
                const updatedItem = user.cart.contents[i];
                updatedItem.quantity = updatedItem.quantity + usedQuantity;
                user.cart.contents[i] = updatedItem;
                user.cart.total =
                    user.cart.total + product.price * usedQuantity;
                await user.save();
                res.json(`${product._id} quantity updated`);
                return;
            }
        }

        const newCartItem = {
            productId,
            quantity: usedQuantity,
        };

        user.cart.contents.push(newCartItem);
        user.cart.total = user.cart.total + product.price * usedQuantity;
        user.save();
        res.json(`${product._id} added to cart`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/", async (req, res) => {
    const user = await User.findById(USER_ID);
    user.cart.total = 0;
    user.cart.contents = [];
    await user.save();
    res.json("Cleared user's cart");
});

module.exports = router;
