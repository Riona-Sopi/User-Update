const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const validation = require("../validators/auth.validation");
const expressJwt = require("express-jwt");
const authService = require("../services/auth/auth.services");
const _ = require("lodash");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const shortId = require("shortid");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pdf");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([{ name: "cv" }, { name: "image" }]);

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /pdf|doc|docs|word/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({ upload: "Error: PDf file only and docs!" });
  }
}

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.signup = async (req, res) => {
  let newUser;

  try {
    const { error } = validation.userSignupValidation(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const doesEmailExist = await User.findOne({ email: req.body.email });

    if (doesEmailExist)
      return res.status(400).json({ error: "Email already exists" });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .json({ error: "User with that email exists. Please siginin." });

    newUser = authService.signup(req.body);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    return;
  }

  if (newUser) {
    res.status(200).json({
      success: true,
      newUser,
      message:
        "New User added successfully! Sign in, or add another user below.",
    });
  } else {
    res.status(500).json({ success: false });
  }
};

exports.signin = async (req, res) => {
  // const captchaToken = req.body.captchaToken;

  // const googleVerifyUrl=`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.YOUR_PRIVATE_KEY}&response=${captchaToken}`
  // const response = await axios.post(googleVerifyUrl);
  // const {success} = response.data;
  // if(success){
  //   return res.json({ success: true });
  // }else {
  //   return res
  //   .status(400)
  //   .json({ error: "Invalid Captcha. Try again." });
  // }

  // if(res.data.success)
  // console.log('Human');
  // else
  //   console.log('BOT!!!');

  // validate the user
  const { error } = validation.userSigninValidation(req.body);
  
  // throw validation errors
  if (error) return res.status(400).json({ error: error.details[0].message });

  // throw error when email is wrong

  try {
    // check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "Email is wrong" });

    // if (!user) {
    //   return res.status(400).json({
    //     error: "User with that email does not exist. Please signup.",
    //   });
    // }
    // authenticate
    // if (!user.authenticate(password)) {
    //     return res.status(400).json({
    //         error: 'Email and password do not match.'
    //     });
    // }
    const verify = await bcrypt.compare(req.body.password, user.hashed_password);
    if (!verify) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }
    // generate a token and send to client
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { _id, username, name, email, role } = user;
    res.cookie("token", token, { expiresIn: "1d" });
    // const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "error" });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  _id: this._id,
  role: this.role,
  // userProperty: "auth",
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

//This function should be fixed. Name email role should all be able to be edited.

// exports.update = async (req, res) => {
//     try {
//         const { error } = validation.editValidation(req.body);

//         if (error) return res.status(400).json({ error: error.details[0].message });

//         const update = {};

//         if(req.body.name) update.name = req.body.name;
//         if(req.body.email)  update.email = req.body.email;
//         if(req.body.role) update.role = req.body.role;
//         if(req.body.password) {
//             const salt = await bcrypt.genSalt(10)
//             const hashPassword = await bcrypt.hash(req.body.password, salt)
//             update.password = hashPassword;
//         }

//         User.findOneAndUpdate({_id: req.body.id}, update, {
//             new: true
//         }).then(user => res.json(user))
//         .catch(err => res.status(404).json(err));
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//         return;
//     }
// };

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ error: "User does not exist." });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.list = async (req, res) => {
  try {
    const user = await User.find({}).select(
      "_id name email role postedBy createdAt updatedAt"
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        error: "Admin resource. Access denied",
      });
    }

    req.profile = user;
    next();
  });
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(500).json({ error: "User does not exist" });

    const token = jwt.sign(
      {
        email: email,
      },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: 7200, //expires in 2h
      }
    );
    const link = process.env.CLIENT_URL + "/auth/password/reset/" + token;
    await user.updateOne({ resetPasswordLink: token });
    await sendMail(email, link, user.name);
    res.status(200).json({
      message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 2 hours.`,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: "Expired link. Try again",
          });
        }
        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(401).json({
              error: "Something went wrong. Try later",
            });
          }
          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        });
      }
    );
  }
};
