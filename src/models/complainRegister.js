const mongoose = require("mongoose");
const Joi = require("joi");

//Define ComplainRegistrer Schema
const complainRegisterSchema = new mongoose.Schema(
    {
        clientEmail: { type: String, required: true },
        issue: { type: String, required: true },
    },
    { timestamps: true }
);

//Define ComplainRegistrer Schema Validation
const validSchema = Joi.object()
    .keys({
        clientEmail: Joi.string().required(),
        issue: Joi.string().required(),
    })

const complainRegister = mongoose.model("complainRegister", complainRegisterSchema);
module.exports = { complainRegister, validSchema };
