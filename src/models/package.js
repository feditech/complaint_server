const mongoose = require("mongoose");
const Joi = require("joi");

//Define Package Schema
const packageSchema = new mongoose.Schema(
  {
    packageName: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

//Define Package Schema Validation
const validSchema = Joi.object()
  .keys({
    packageName: Joi.string().required(),
    price: Joi.string().required(),
    duration: Joi.string().required(),
  }).options({ allowUnknown: true });

const Package = mongoose.model("package", packageSchema);
module.exports = { Package, validSchema };
