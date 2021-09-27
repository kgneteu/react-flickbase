const {roles} = require("../config/roles");
module.exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {

            //roles.can(req.user.role) returns object with functions
            // like createAny, updateAny, deleteAny, readAny, createOwn...
            // so actions should be createAny, updateAny, deleteAny, readAny, createOwn etc

            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(400).json({error: "Not allowed."})
            }
            res.locals.permission = permission;
            // store permission for Fine-Grained Access Control
            // attributes: [ '*', '!password' ],
            // role: 'user',
            // resource: 'profile'
            next();
        } catch (e) {
            next(e)
        }
    }
}
