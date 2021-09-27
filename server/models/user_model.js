const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const validator = require('validator').default;

const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true,
            // validate(value) {
            //     if (!validator.isEmail(value)) {
            //         throw new Error('Invalid email')
            //     }
            // }
            validate: {validator: value => validator.isEmail(value), message: "Wrong e-mail format"},
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        firstname: {
            type: String,
            maxlength: 40,
            trim: true,
            required: true,
        },
        lastname: {
            type: String,
            maxlength: 60,
            trim: true,
            required: true,
        },
        age: {
            type: Number,
            min: 5,
            max: 120,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }, // { timestamps: true,
    // collection: "DifferentName"}
)

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(user.password, salt);
        user.password = password;
    }
    next();
})

UserSchema.statics.emailTaken = async function (email) {
    const user = await this.findOne({email});
    return !!user;
}

UserSchema.methods.generateToken = function () {
    const user = this;
    const userObj = {
        _id: user._id.toHexString(),
        email: user.email,
    }
    return jwt.sign(userObj, process.env.SECRET, {expiresIn: '1d'})
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match;
}

const User = new mongoose.model('User', UserSchema);
module.exports = {User}

