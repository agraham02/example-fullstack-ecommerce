const express = require("express");
const Product = require("../models/product");

const router = express.Router();

const productCreater = (id, name, price, description, img_src) => {
    return { id, name, price, description, img_src };
};

const products = [
    productCreater(
        "1",
        "Plain White T-Shirt",
        99,
        "Plain. Simple.",

        "tops/tShirts/tshirt1.jpg"
    ),
    productCreater(
        "2",
        "NGUYEN HUE T-Shirt",
        35,
        "",
        "tops/tShirts/tshirt2.jpg"
    ),
    productCreater(
        "3",
        "CAMERA CREW T-Shirt",
        20,
        "Let 'em know who you are.",
        "tops/tShirts/tshirt3.jpg"
    ),
    productCreater(
        "4",
        "CHOOSE LOVE T-Shirt",
        20,
        "A simple message with a powerful meaning",
        "tops/tShirts/tshirt4.jpg"
    ),
    productCreater(
        "5",
        "aDd. SeQuL T-Shirt",
        25,
        "This t-shirt features a subtle, yet stylish embroidered design on the back. Made from soft, lightweight cotton, it has a relaxed fit and comes in a variety of colors. The embroidery adds a touch of elegance to this casual shirt, making it perfect for dressier occasions.",
        "tops/tShirts/tshirt5.jpg"
    ),
    productCreater(
        "6",
        "I LOVE MY TATOO T-Shirt",
        20,
        "",
        "tops/tShirts/tshirt6.jpg"
    ),
    productCreater("7", "MARA T-Shirt", 20, "", "tops/tShirts/tshirt7.jpg"),

    productCreater(
        "8",
        "Perception Long Sleeve",
        40,
        "",
        "tops/longSleeves/longSleeve1.jpg"
    ),
    productCreater(
        "9",
        "705 Long sleeve",
        35,
        "",
        "tops/longSleeves/longSleeve2.jpg"
    ),

    productCreater("10", "Fitted Jeans", 25, "", "bottoms/jeans/jeans1.jpg"),
    productCreater("11", "Knee-cut Jeans", 30, "", "bottoms/jeans/jeans2.jpg"),
    productCreater(
        "12",
        "Distressed Jeans",
        30,
        "",
        "bottoms/jeans/jeans3.jpg"
    ),

    productCreater(
        "13",
        "Louis Vuitton Joggers",
        15,
        "",
        "bottoms/joggers/joggers1.jpg"
    ),
    productCreater(
        "14",
        "High Waist Joggers",
        35,
        "",
        "bottoms/joggers/joggers2.jpg"
    ),
    productCreater(
        "15",
        "Relaxed Joggers",
        8,
        "",
        "bottoms/joggers/joggers3.jpg"
    ),
    productCreater(
        "16",
        "Nike Joggers",
        60,
        "",
        "bottoms/joggers/joggers4.jpg"
    ),

    productCreater("17", "Jean Shorts", 15, "", "bottoms/shorts/shorts1.jpg"),
    productCreater(
        "18",
        "Frayed Jean Shorts",
        15,
        "",
        "bottoms/shorts/shorts2.jpg"
    ),

    productCreater("19", "Nike Dunks", 160, "", "shoes/shoes1.jpg"),
    productCreater("20", "Nike Airmax '98", 100, "", "shoes/shoes2.jpg"),
    productCreater("21", "Nike Air Force 1s", 130, "", "shoes/shoes3.jpg"),
    productCreater("22", '"Red" Shoe', 20, "", "shoes/shoes4.jpg"),
    productCreater("23", '"Blue" Shoe 5', 20, "", "shoes/shoes5.jpg"),

    productCreater("24", '"Tree" Hat', 60, "", "accessories/hats/hat1.jpg"),
    productCreater(
        "25",
        '"Ice Cream" Hat',
        60,
        "",
        "accessories/hats/hat2.jpg"
    ),
    productCreater("26", '"WHITE" Hat', 60, "", "accessories/hats/hat3.jpg"),
    productCreater(
        "27",
        "Apple Watch Series 4",
        35,
        "It's alright.",
        "accessories/watches/watch1.jpg"
    ),
    productCreater(
        "28",
        "Fossil Watch",
        200,
        "A modern take on a timeless timepiece.",
        "accessories/watches/watch2.jpg"
    ),
    productCreater(
        "29",
        "Rolex Watch",
        3600,
        "THe classic Rolex watch.",
        "accessories/watches/watch3.jpg"
    ),
];

const getProductById = (id) => {
    for (const product of products) {
        if (product.id === id) {
            return product;
        }
    }
    return null;
};

router.post("/", async (req, res) => {
    const { name, price } = req.body;
    const data = new Product({
        name,
        price,
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    // res.json(products);
    // res.send("Get All API");
    try {
        const data = await Product.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    // const { id } = req.params;
    // const product = getProductById(id);
    // res.json(product);
    // const { id } = req.params;
    // res.send(id);
    try {
        const data = await Product.findById(req.params.id);
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

        const result = await Model.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    // res.send("Delete by ID API");
    try {
        const { id } = req.params;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
