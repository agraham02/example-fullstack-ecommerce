const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
    },
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

inventorySchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("Inventory", inventorySchema);
