const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const router = express.Router();

const passwordHash = async (password, saltRounds) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        // throw error;
        console.log(err);
    }
    return null;
};

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const account = await User.findOne({ email: email });
//     console.log(account);
//     if (account.password == password) {
//         console.log("Welcome!");
//         req.session.authenticated = true;
//         req.session.user = account;
//         console.log(req.session);
//     } else {
//         console.log("Denied!");
//     }
//     res.send("Hello there!");
// });

router.post("/register", async (req, res) => {
    const { firstName, familyName, email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            //there's already a user with that email
            console.log("There's already a user with that email");
            const error = new Error("A user with that email already exists");
            error.status = 406;
            return next(error);
        }

        const hashedPassword = await passwordHash(password, 10);
        const data = new User({
            first_name: firstName,
            family_name: familyName,
            email,
            password: hashedPassword,
        });
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json("Authenticated");
});

router.get("/test", async (req, res) => {
    res.json(await req.user);
});

router.get("/test2", async (req, res) => {
    res.json(await req.user);
});

router.get("/is-authenticated", async (req, res) => {
    const result = await req.isAuthenticated();
    res.json(result);
});

router.get("/id", async (req, res) => {
    const account = await req.user;
    res.json(account._id);
});

router.get("/logout", (req, res) => {
    try {
        req.logout((err) => {
            if (err) {
                throw new Error();
            }
        });
        res.json("Successfully logged out");
    } catch (error) {
        console.log(error);
        res.json("there was an error loggin out");
    }
});

module.exports = router;
