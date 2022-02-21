const mongoose = require("mongoose");
const Joi = require("joi");

//Define client Schema
const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

//Define client Schema Validation
const validSchema = Joi.object()
  .keys({
    name: Joi.string().required('name is required'),
    email: Joi.string().required('email is required'),
    phone: Joi.string()
      .min(8)
      .max(11)
      .pattern(/^[0-9]+$/)
      .required("phone is required.(8 to 11 digits)"),
    address: Joi.string().required('address is required'),
  })
  .options({ allowUnknown: true });

const Client = mongoose.model("client", clientSchema);
module.exports = { Client, validSchema };
