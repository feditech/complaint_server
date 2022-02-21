const mongoose = require("mongoose");
const Joi = require("joi");

//Define Subscribe Schema
const subscribeSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "client", required: true, unique: true },
    packageName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

//Define Subscribe Schema Validation
const validSchema = Joi.object()
  .keys({
    clientId: Joi.string().alphanum().required(),
    packageName: Joi.string().required(),
  }).options({ allowUnknown: true });

const Subscribe = mongoose.model("subscribe", subscribeSchema);
module.exports = { Subscribe, validSchema };
