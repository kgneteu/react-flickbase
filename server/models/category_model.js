const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            unique: [true, "You need a category name"],
            required: true,
            lowercase: true,
            maxlength: 100,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
)

const Category = new mongoose.model('Category', CategorySchema);
module.exports = {Category}

