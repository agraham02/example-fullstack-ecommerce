const mongoose = require("mongoose");
const cartItemSchema = require("./helpers/cartItem");
const addressSchema = require("./helpers/address");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            required: true,
            type: String,
            maxLength: 100,
        },
        familyName: {
            required: true,
            type: String,
            maxLength: 100,
        },
        email: {
            type: String,
            required: true,
            maxLength: 255,
            lowercase: true,
        },
        password: { type: String, required: true },
        addresses: [{ type: addressSchema }],
        paymentMethods: [],
        cart: {
            contents: { type: mongoose.Schema.Types.Mixed, default: {} },
            total: { type: Number, min: 0, default: 0 },
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
        createdAt: {
            type: Date,
            default: () => Date.now(),
            immutable: true,
        },
        updatedAt: {
            type: Date,
            default: () => Date.now(),
        },
    },
    { minimize: false }
);

userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

//when item added/removed to cart, update cart total

//look into virtual properties (for first and last names)
module.exports = mongoose.model("User", userSchema);
