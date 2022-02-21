const { Client, validSchema } = require("../models/client");
const CustomErrorHandler = require("../services/customErrorHnadler");
module.exports = {
  //Create client 
  async create(req, res, next) {
    // Validation
    const { error } = validSchema.validate(req.body);
    if (error) return next(error);

    //check if user is in the database already
    try {
      const isEmail = await Client.exists({ email: req.body.email });
      if (isEmail) {
        return next(
          CustomErrorHandler.alreadyExixt("This email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }

    const data = Client(req.body);

    try {
      const result = await data.save();

      res.status(201).json({ success: true, result });
    } catch (err) {
      return next(err);
    }
  },
  //get all client
  async get(req, res, next) {
    try {
      const data = await Client.find().exec();
      res.status(202).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
  //Update client
  async update(req, res, next) {
    // Validation
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const data = await Client.findByIdAndUpdate(
        req.body._id,
        {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
        },
        { new: true }
      );
      res.status(200).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
};
