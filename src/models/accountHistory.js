const mongoose = require("mongoose");
const Joi = require("joi");

//Define accountHistory Schema
const accountHistorySchema = new mongoose.Schema(
  {
    Id: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: String, required: true },
  },
  { timestamps: true }
);


const accountHistory = mongoose.model("accountHistory", accountHistorySchema);
module.exports = accountHistory

