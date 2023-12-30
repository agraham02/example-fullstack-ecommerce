const express = require("express");
const User = require("../models/user");
const Order = require("../models/order");

const router = express.Router();

const USER_ID = "64ecf263a040b401d0931145";

router.get("/", async (req, res) => {
    try {
        const data = await User.find();
        // const account = await req.user;
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/my-account", async (req, res) => {
    try {
        const myId = await req.user;
        const myData = await User.findById(myId);
        res.json(myData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/orders", async (req, res) => {
    const user = await User.findById(USER_ID);
    // console.log(user);
    const myOrders = await Order.find({ userId: user._id });
    console.log(myOrders);
    res.json(myOrders);
});

router.post("/orders", async (req, res) => {
    try {
        const user = await User.findById(USER_ID);
        const { addressData, cardData } = req.body;
        // const { cart, {contents } } = user;
        const { cart, cart: { contents } = {} } = user;
        // console.log(cart);
        // console.log(contents);
        const orderContentsArray = [];
        for (const itemId in contents) {
            if (contents.hasOwnProperty(itemId)) {
                console.log(contents[itemId]);
                orderContentsArray.push(contents[itemId]);
            }
        }
        const newOrder = new Order({
            userId: user.id,
            contents: orderContentsArray,
            total: cart.total,
            status: "Placed",
            address: addressData,
            card: cardData,
        });
        console.log(newOrder);
        user.orders.push(newOrder.id);
        await newOrder.save();
        await user.save();
        // TODO clear cart
        res.json("Your order has been placed");
    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const { firstName, familyName, email, password } = req.body;
    const data = new User({
        firstName: firstName,
        familyName: familyName,
        email,
        password,
    });
    console.log(data);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    // res.send("Update by ID API");
    try {
        const { id } = req.params;
        const updatedData = req.body;
        updatedData.updatedAt = Date.now();
        const options = { new: true };

        const newUser = await User.findByIdAndUpdate(id, updatedData, options);
        res.send(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    // res.send("Delete by ID API");
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.send(`Document has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
