const jwt = require("express-jwt");
//const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
// const { secret } = require('../config.json');

module.exports = authorize;


function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}),

        // authorize based on user role
        (req, res, next) => {
            const b = req.user.role;
            // roles.some(v=> b.indexOf(v) !==-1)
            if (roles.some(v=> b.indexOf(v) !==-1)) {
                next();
                // user's role is not authorized
            }
            else{
                return res.status(401).json({ message: 'Unauthorized' });
                // console.log(roles)
            }
        }
    ];
}


