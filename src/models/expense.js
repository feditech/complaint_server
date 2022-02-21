const mongoose = require("mongoose");
const Joi = require("joi");

//Define Expense Schema
const expenseSchema = new mongoose.Schema(
  {
    paymentType: { type: String, required: true, enum: ["cheque", "cash"] },
    amount: { type: String, required: true },
    to: { type: String, required: true, },
    comment: { type: String, required: true },
    paidby: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

//Define Expense Schema Validation
const validSchema = Joi.object()
  .keys({
    paymentType: Joi.string().required(),
    amount: Joi.string().required(),
    to: Joi.string().required(),
    comment: Joi.string().required(),
    paidby: Joi.string().alphanum().required(),
  }).options({ allowUnknown: true });

const Expense = mongoose.model("expense", expenseSchema);
module.exports = { Expense, validSchema };
