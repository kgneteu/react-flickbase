const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: {validator: value => validator.isEmail(value), message: "Wrong e-mail format"},
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    firstname: {
        type: String,
        maxlength: 40,
        trim:true,
    },
    lastname: {
        type: String,
        maxlength: 60,
        trim:true,
    },
    age: {
        type: Number,
        min: 5,
        max: 120,
    },
    date: Date,
    default: Date.now,

}, {
    // timestamps: true,
    // collection: "DifferentName"
})

const User = new mongoose.model('User', UserSchema);


module.exports = {User}

