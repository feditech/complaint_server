const { Complain, validSchema } = require("../models/complain");
const Joi = require("joi");
const crypto = require("crypto");

module.exports = {
  //Create all complain
  async create(req, res, next) {
    //validation
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const data = Complain(req.body);
    const alphanum = crypto.randomBytes(5).toString("hex");
    data.complainId = alphanum;
    try {
      await data.save();
      res.status(201).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
  //Get all Complain
  async get(req, res, next) {
    try {
      const data = await Complain.find().exec();
      res.status(202).json(data);
    } catch (err) {
      return next(err);
    }
  },
  //Update Complain
  async update(req, res, next) {
    console.log(req.body);
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const data = await Complain.findByIdAndUpdate(
        req.body._id,
        {
          comment: req.body.comment,
          complainType: req.body.complainType,
          status: req.body.status,
        },
        { new: true }
      );
      res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  },
};
