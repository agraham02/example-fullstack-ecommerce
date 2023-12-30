const mongoose = require("mongoose");
const cartItemSchema = require("./helpers/cartItem");
const addressSchema = require("./helpers/address");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        immutable: true,
    },
    contents: [{ type: cartItemSchema }],
    total: { type: Number, min: 0, default: 0, immutable: true },
    status: { type: String },
    address: { type: addressSchema, required: true },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
});

orderSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("Order", orderSchema);
