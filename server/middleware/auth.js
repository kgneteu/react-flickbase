const jwt = require("jsonwebtoken");
const {User} = require("../models/user_model");
exports.checkToken = async function (req, res, next) {
    try {
        if (req.headers['x-access-token']) {
           let token = req.headers['x-access-token'];
           //expiration is validated automatically
           const {_id, email, exp} = jwt.verify(token,process.env.SECRET);
           //res.locals.userData = {_id, email, exp}
            res.locals.userData = await User.findById(_id);
            next();
        } else {
            next();
        }
    } catch (e) {
        console.log(e)
        return res.status(401).json({error: "Bad token.", errors: e})
    }
}

exports.checkLoggedIn= async function(req, res, next){
    const user = res.locals.userData;
    if (!user) return res.status(401).json({error: "User not found."})
    req.user = user;
    next();
}
