const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const validation = require("../validators/user.validation");
const expressJwt = require("express-jwt");
const authService = require('../services/auth/auth.services');
const _ = require('lodash');
const shortId = require('shortid');

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
};


exports.update = async (req, res) => { 
    try { 
        // const { error } = validation.editValidation(req.body);

        // if (error) return res.status(400).json({ error: error.details[0].message });

        const update = {};

        if(req.body.name) update.name = req.body.name;
        if(req.body.email)  update.email = req.body.email;
        if(req.body.role) update.role = req.body.role;
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            update.password = hashPassword;
        }
    
        User.findOneAndUpdate({_id: req.body.id}, update, {
            new: true
        }).then(user => res.json(user))
        .catch(err => res.status(404).json(err));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        return;
    }
};

exports.getUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId) 
      .select('_id name email role password postedBy createdAt updatedAt')
  
      if (!user) return res.status(400).json({ error: "User does not exist." });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  exports.list = async (req, res) => {
    try {
        const user = await User.find({})
       
        .select('_id name email role postedBy createdAt updatedAt')
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  exports.editUser = async (req, res, next) => {
    // validate the user
    // const { error } = validation.userUpdateValidation(req.body);
  
    // throw validation errors
    // if (error) return res.status(400).json({ error: error.details[0].message });
    try {
      const id = req.params.userId;
      await User.findByIdAndUpdate(id, req.body);
      res.status(200).json({ data: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  exports.remove = async (req, res, next) => {
    try {
      const id = req.params.userId;
      await User.findByIdAndDelete(id);
  
      res.status(200).json({ data: "User successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };


  exports.listSearch = (req, res) => {
    console.log(req.query);
    const { search } = req.query;
    if (search) {
        User.find(
            {
                $or: [{ name: { $regex: search, $options: 'i' } }]
            },
            (err, users) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(users);
            }
        ).select('');
    }
};

