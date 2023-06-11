const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await User.find();
        // const account = await req.user;
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

router.get("/my-profile", async (req, res) => {
    try {
        const myId = await req.user;
        const myData = await User.findById(myId);
        res.json(myData);
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
