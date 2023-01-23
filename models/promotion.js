const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
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
    discount_rate: {
        type: Number,
        required: true,
    },
    start_date: {
        default: Date.now,
        type: Date,
    },
    end_date: {
        // default: Date.now,
        type: Date,
    },
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("Promotion", dataSchema);
