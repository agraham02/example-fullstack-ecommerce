const express = require("express");
const Product = require("../models/product");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await Product.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await Product.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const { name, price, description } = req.body;
    const data = new Product({
        name,
        price,
        description,
    });

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

        const result = await Product.findByIdAndUpdate(
            id,
            updatedData,
            options
        );
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    // res.send("Delete by ID API");
    try {
        const { id } = req.params;
        const data = await Product.findByIdAndDelete(id);
        res.send(`Document has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
