const mongoose = require("mongoose");

const cartItem = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    size_option: { type: String, required: true, maxLength: 10 },
    color_option: { type: String, required: true, maxLength: 50 },
    quantity: { type: Number, min: 0, default: 1 },
});

const cart = new mongoose.Schema({
    contents: [{ type: cartItem, default: {} }],
    total: { type: Number, min: 0, default: 0 },
});

const dataSchema = new mongoose.Schema({
    order_contents: { type: cart },
    order_date: {
        default: Date.now,
        type: Date,
    },
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("Order", dataSchema);
