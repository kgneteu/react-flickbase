const {AccessControl} = require("accesscontrol");

let grantsObject = {
    admin: {
        profile: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        articles:{
            'read:any': ['*'],
        },
        article: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        categories: {
            'create:any': ['*'],
        },
        category: {
            'create:any': ['*'],
            'delete:any': ['*'],
            'update:any': ['*'],
        }
    },
    user: {
        profile: {
            'read:own': ['*','!password','!date'],
            'update:own': ['*'],
        }
    }
};
const roles = new AccessControl(grantsObject);

module.exports = {roles}
