const mongoose = require("mongoose");
// const Order = require("./order");

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    sizeOption: { type: String, maxLength: 10 },
    colorOption: { type: String, maxLength: 50 },
    price: { type: Number, min: 0, immutable: true },
    quantity: { type: Number, min: 0, default: 1, required: true },
});

module.exports = cartItemSchema;
