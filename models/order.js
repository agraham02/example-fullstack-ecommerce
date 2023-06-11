const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        immutable: true,
    },
    contents: [],
    total: { type: Number, min: 0, default: 0, immutable: true },
    status: { type: String },
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
