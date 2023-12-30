const express = require("express");
const Order = require("../models/order");

const router = express.Router();
const USER_ID = "648562298ad300ba11e70009";

//gets all orders
router.get("/", async (req, res) => {
    try {
        const data = await Order.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//gets order by id
router.get("/:id", async (req, res) => {});

//get all orders for userId
router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
    const user = await User.findById(USER_ID);
});

module.exports = router;
