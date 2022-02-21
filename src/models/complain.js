const mongoose = require("mongoose");
const Joi = require("joi");

//Define Complain Schema
const complainSchema = new mongoose.Schema(
  {
    complainId: { type: String },
    comment: { type: String, required: true },
    complainType: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "client", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//Define Complain Schema Validation
const validSchema = Joi.object().keys({
  comment: Joi.string().required(),
  complainType: Joi.string().required(),
  status: Joi.boolean().default(true),
}).options({ allowUnknown: true });

const Complain = mongoose.model("complain", complainSchema);
module.exports = { Complain, validSchema };
