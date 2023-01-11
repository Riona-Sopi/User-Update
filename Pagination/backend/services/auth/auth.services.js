const User = require('../../models/user.model');
const shortId = require('shortid');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

exports.signup = async(data) => {
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    const user = new User({
        name: data.name,
        email:data.email,
        password: data.password,
        profile: profile,
        username: username,
        role: data.role
    })
    const saved_user = user.save();
    return saved_user;
};

