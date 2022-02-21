const { Income, validSchema } = require("../models/income");
const accountHistory = require("../models/accountHistory");
const CustomErrorHandler = require("../services/customErrorHnadler");
const Joi = require("joi");
const { Client } = require("../models/client");

module.exports = {
  //Create Income
  async create(req, res, next) {
    //validation
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {

      // check if client name already subscribe 
      const isClient = await Client.exists({ _id: req.body.clientId });
      if (!isClient) {
        console.log("enter");
        return next(
          CustomErrorHandler.wrongCredentials("this client is not register.")
        );
      }

    } catch (err) {
      return next(err);
    }

    const data = Income(req.body);

    try {
      await data.save((err, success) => {
        if (err) {
          return next(err);
        }

        const result = accountHistory({
          Id: success.clientId,
          amount: success.amount,
        });
        result.save();
      });
      res.status(201).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
  //Get all Income
  async get(req, res, next) {
    try {
      const data = await Income.find().exec();
      res.status(202).json(data);
    } catch (err) {
      return next(err);
    }
  },
  //Update Income
  async update(req, res, next) {
    console.log(req.body);
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {

      // check if client name already subscribe 
      const isClient = await Client.exists({ _id: req.body.clientId });
      if (!isClient) {
        console.log("enter");
        return next(
          CustomErrorHandler.wrongCredentials("this client is not register.")
        );
      }

    } catch (err) {
      return next(err);
    }

    try {
      const data = await Income.findByIdAndUpdate(
        req.body._id,
        {
          clientId: req.body.clientId,
          paymentType: req.body.paymentType,
          amount: req.body.amount,
        },
        { new: true }
      )
        .then((success) => {
          accountHistory.findOneAndUpdate(
            success._id,
            {
              Id: success._id,
              amount: success.amount,
            },
            { new: true }
          );
        })
        .catch((err) => {
          next(err);
        });

      res.status(200).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
};
