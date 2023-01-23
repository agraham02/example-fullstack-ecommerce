const mongoose = require("mongoose");
// const Order = require("./order");

// const cartItem = new mongoose.Schema({
//     product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//     // size_option: { type: String, required: true, maxLength: 10 },
//     // color_option: { type: String, required: true, maxLength: 50 },
//     quantity: { type: Number, min: 0, default: 1 },
//     price: { type: Number, min: 0, required: true },
// });

const cart = new mongoose.Schema({
    contents: [{}],
    total: { type: Number, min: 0, default: 0 },
});

const dataSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String,
        maxLength: 100,
    },
    family_name: {
        required: true,
        type: String,
        maxLength: 100,
    },
    email: { type: String, required: true, maxLength: 255 },
    password: { type: String, required: true, maxLength: 255 },
    addresses: [], //is_default
    payment_methods: [], //is_default
    cart: { type: cart, default: {} },
    orders: [],
    created_at: {
        default: Date.now,
        type: Date,
    },
});

//look into virtual properties
module.exports = mongoose.model("User", dataSchema);
