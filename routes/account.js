const express = require("express");
const User = require("../models/User");

const router = express.Router();

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

router.get("/", async (req, res) => {
    try {
        // const data = await User.find();
        const account = await req.user;
        res.json(account);
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

router.patch("/:id", async (req, res) => {
    // res.send("Update by ID API");
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    // res.send("Delete by ID API");
    try {
        const { id } = req.params;
        const data = await User.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
