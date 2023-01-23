const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        maxLength: 100,
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0,
    },
    created_at: {
        default: Date.now,
        type: Date,
    },
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("Inventory", dataSchema);
