const express = require("express");
const User = require("../models/User");
const Product = require("../models/product");
const CartItem = require("../models/cartItem");

const router = express.Router();

router.post("/add-to-cart", async (req, res) => {
    try {
        const { productId } = req.body;
        const account = await req.user;
        const product = await Product.findById(productId);
        // console.log(account);
        // console.log(product);

        if (account.cart.contents.length > 0) {
            console.log("Hey");
            for (let i = 0; i < account.cart.contents.length; i++) {
                if (product._id.equals(account.cart.contents[i].product_id)) {
                    console.log("already in cart. updating num...");
                    // cartItem.quantity = cartItem.quantity + 1;
                    account.cart.contents[i].quantity =
                        account.cart.contents[i].quantity + 1;
                    // cartItem.cart.total = cartItem.cart.total + product.price;
                    account.cart.total = account.cart.total + product.price;
                    const result = await User.findByIdAndUpdate(
                        account._id,
                        account
                    );
                    res.json(`${product._id} quantity updated`);
                    return;
                }
            }
        }

        const item = new CartItem({
            product_id: product._id,
            quantity: 1,
        });
        account.cart.contents.push(item);
        account.cart.total = account.cart.total + product.price;

        const result = await User.findByIdAndUpdate(account._id, account);
        console.log(`${product._id} added to cart`);
        res.json(`${product._id} added to cart`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/count/:userId", async (req, res) => {
    const account = await req.user;
    if (account) {
        res.json(account.cart.contents.length);
        return;
    } else {
        res.json(null);
    }
});

// router.post("/", async (req, res) => {
//     const { firstName, familyName, email, password } = req.body;
//     const data = new User({
//         first_name: firstName,
//         family_name: familyName,
//         email,
//         password,
//     });

//     try {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// router.get("/", async (req, res) => {
//     try {
//         const data = await User.find();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.get("/:id", async (req, res) => {
//     try {
//         const data = await Model.findById(req.params.id);
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.patch("/:id", async (req, res) => {
//     // res.send("Update by ID API");
//     try {
//         const { id } = req.params;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(id, updatedData, options);
//         res.send(result);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

router.delete("/remove-item", async (req, res) => {
    // res.send("Delete by ID API");
    try {
        const { productId } = req.body;
        const account = await req.user;

        for (let i = 0; i < account.cart.contents.length; i++) {
            if (account.cart.contents[i].product_id.equals(productId)) {
                console.log("found item, deleating...");
                // cartItem.quantity = cartItem.quantity + 1;
                const quantity = account.cart.contents[i].quantity;
                const price = account.cart.contents[i].price;
                // cartItem.cart.total = cartItem.cart.total + product.price;
                account.cart.total = account.cart.total - price * quantity;
                const result = await User.findByIdAndUpdate(
                    account._id,
                    account
                );
            }
        }
        const filteredCart = account.cart.contents.filter((product) => {
            product._id !== productId;
        });
        console.log(filteredCart);
        res.json("removed item");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
