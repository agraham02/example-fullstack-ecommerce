const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxLength: 255,
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
        type: String,
        // required: true,
    },
    subCategory: {
        type: String,
    },
    imgSrc: [],
    sizeOptions: [{ type: String, enum: ["OS", "XS", "S", "M", "L", "XL"] }],
    colorOptions: [],
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

productSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("Product", productSchema);
