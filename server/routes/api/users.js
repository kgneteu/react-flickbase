const express = require("express");
const {User} = require("../../models/user_model");
const {checkLoggedIn} = require("../../middleware/auth");
const {grantAccess} = require("../../middleware/roles");
let router = express.Router();


router.route("/register").post(async (req, res) => {
    try {
        if (await User.emailTaken(req.body.email)) {
            return res.status(400).json({message: "Sorry, E-mail is already taken"});
        }
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            date: req.body.date,
        })

        const token = user.generateToken();
        const doc = await user.save();

        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        res.cookie("x-access-token", token, {expires}).status(200).send(getUserProps(doc));
    } catch (e) {
        res.status(400).json({message: "User registration failed.", error: e});
    }
})

router.route("/login").post(async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) return res.status(400).json({message: "Email not found."});
        if (!await user.comparePassword(password)) return res.status(400).json({message: "Wrong password."});

        const token = await user.generateToken();
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        res.cookie("x-access-token", token, {expires}).status(200).send(getUserProps(user));
    } catch (e) {
        res.status(400).json({message: "Login failed.", error: e});
    }
})

router.route("/profile").get(checkLoggedIn, grantAccess('readOwn', 'profile'), async (req, res) => {
    try {
        const permission = res.locals.permission;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json({message: "User not found."});
        const plainUser = user._doc;
        res.status(200).json(permission.filter(plainUser));
    } catch (e) {
        res.status(400).json({message: "User not found.", error: e});
    }

}).patch(checkLoggedIn, grantAccess('updateOwn', 'profile'), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age,
                }
            },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!user) return res.status(400).json({message: "User not found."});
        return res.json(getUserProps(user));
    } catch (e) {
        res.status(400).json({message: "Update failed.", error: e.message});
    }
});

router.route("/is_auth").get(checkLoggedIn, async (req, res) => {
    res.status(200).json(getUserProps(req.user));
})


router.route("/update_email").patch(checkLoggedIn, grantAccess('updateOwn', 'profile'), async (req, res) => {
    try {
        const user = req.user;
        if (await User.emailTaken(req.body.new_email)){
            return res.status(400).json({message: "Email is already taken."});
        }

        user.email = req.body.email;
        const token = await user.generateToken();
        const updatedUser = await User.findByIdAndUpdate(
           user._id,
            {
                email: req.body.new_email,
            } ,
            {
                new: true,
                runValidators: true,
            }
        )
        if (!updatedUser) return res.status(400).json({message: "User not found."});
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        res.cookie("x-access-token", token, {expires}).status(200).send(getUserProps(updatedUser));
    } catch (e) {
        res.status(400).json({message: "Update failed.", error: e});
    }

})

//filter some props like password
function getUserProps(user) {
    return {
        _id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        role: user.role,
    }
}

module.exports = router;
