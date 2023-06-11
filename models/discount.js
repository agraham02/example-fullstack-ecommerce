const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxLength: 100,
    },
    code: {
        required: true,
        type: String,
        maxLength: 100,
    },
    description: {
        type: String,
        default: "No Description Avaliable",
    },
    discountPercent: {
        type: Number,
        required: true,
    },
    startDate: {
        default: Date.now,
        type: Date,
    },
    endDate: {
        // default: Date.now,
        type: Date,
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

discountSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("Discount", discountSchema);
