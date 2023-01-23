const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        maxLength: 100,
    },
    variation: {
        type: String,
        maxLength: 100
        //like color, size, one size fits all
    },
    size_options: [{type: String, enum: ["XS, S, M, L, XL"]}],
    color_options: []
});

//create virtual property to see if item is in stock
module.exports = mongoose.model("ProductCategory", dataSchema);
