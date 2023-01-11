const Joi = require("joi");

exports.userSignupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email:  Joi.string().min(6).max(255).required().email(),
    role: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

exports.userSigninValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

exports.forgotPasswordValidator = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(3),
    });
  
    return schema.validate(data);
  };


  exports.resetPasswordValidator = (data) => {
    const schema = Joi.object({
       newPassword: Joi.string().min(6).max(1024).required(),
    });
  
    return schema.validate(data);
  };