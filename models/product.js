const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxLength: 100,
    },
    price: {
        required: true,
        type: Number,
        min: 0,
    },
    description: {
        type: String,
        default: "No Description Avaliable",
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
        required: true,
    },
    sub_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
    },
    img_src: {
        type: String,
        default: "defaultImg.jpg",
    },
    created_at: {
        default: Date.now,
        type: Date,
    },
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("Product", dataSchema);
