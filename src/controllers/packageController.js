const { Package, validSchema } = require("../models/package");
const CustomErrorHandler = require("../services/customErrorHnadler");
const Joi = require("joi");

module.exports = {
  //Create all package
  async create(req, res, next) {
    //validation
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    // check if user is in the database already
    try {
      const isPackageName = await Package.exists({ packageName: req.body.packageName });
      if (isPackageName) {
        return next(
          CustomErrorHandler.alreadyExixt("This package Name is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }

    const data = Package(req.body);

    try {
      await data.save();
      res.status(201).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
  //Get all Package
  async get(req, res, next) {
    try {
      const data = await Package.find().exec();
      res.status(202).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
  //Update Package
  async update(req, res, next) {
    console.log(req.body)
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const data = await Package.findByIdAndUpdate(
        req.body._id,
        {
          packageName: req.body.packageName,
          price: req.body.price,
          duration: req.body.duration,
        },
        { new: true }
      );
      res.status(200).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
};
