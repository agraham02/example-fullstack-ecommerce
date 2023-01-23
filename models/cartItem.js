const mongoose = require("mongoose");

const cartItem = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    // size_option: { type: String, required: true, maxLength: 10 },
    // color_option: { type: String, required: true, maxLength: 50 },
    quantity: { type: Number, min: 0, default: 1 },
    // price: { type: Number, min: 0, required: true },
});

//look into virtual properties
module.exports = mongoose.model("CartItem", cartItem);
