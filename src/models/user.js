const mongoose = require("mongoose");
const Joi = require("joi");

//Define User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userType: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//Define User Schema Validation
const validSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  userType: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("password not match"),
});

const User = mongoose.model("user", userSchema);
module.exports = { User, validSchema };
