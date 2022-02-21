const mongoose = require("mongoose");
const Joi = require("joi");

//Define Income Schema
const incomeSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "client", required: true },
    paymentType: { type: String, required: true, enum: ["cheque", "cash"] },
    amount: { type: String, required: true },
  },
  { timestamps: true }
);

//Define Income Schema Validation
const validSchema = Joi.object()
  .keys({
    clientId: Joi.string().alphanum().required(),
    paymentType: Joi.string().required(),
    amount: Joi.string().required(),
  })
  .options({ allowUnknown: true });

const Income = mongoose.model("income", incomeSchema);
module.exports = { Income, validSchema };
