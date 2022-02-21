const { Subscribe, validSchema } = require("../models/subscribe");
const CustomErrorHandler = require("../services/customErrorHnadler");
const { Package } = require("../models/package");

module.exports = {
  //Create Subscribe
  async create(req, res, next) {
    //Validation
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      // check if package name is in the database 
      const isPackageName = await Package.exists({ packageName: req.body.packageName });
      if (!isPackageName) {
        return next(
          CustomErrorHandler.wrongCredentials("please Enter Valid Package Name.")
        );
      }

      // check if package name already subscribe 
      const isClient = await Subscribe.exists({ clientId: req.body.clientId });
      if (isClient) {
        return next(
          CustomErrorHandler.alreadyExixt("this Client has already subscribed to a package.")
        );
      }

    } catch (err) {
      return next(err);
    }

    const data = Subscribe(req.body);

    try {
      await data.save();
      res.status(201).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
  //Get all Subscribe
  async get(req, res, next) {
    try {
      const data = await Subscribe.find().exec();
      res.status(202).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
  //Update Subscribe
  async update(req, res, next) {
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }
  
    try {
      // check if package name is in the database 
      const isPackageName = await Package.exists({ packageName: req.body.packageName });
      if (!isPackageName) {
        return next(
          CustomErrorHandler.wrongCredentials("please Enter Valid Package Name.")
        );
      }

    } catch (err) {
      return next(err);
    }
    
    try {
      const data = await Subscribe.findByIdAndUpdate(
        req.body._id,
        {
          clientId: req.body.clientId,
          package: req.body.package,
        },
        { new: true }
      );
      res.status(200).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
};
