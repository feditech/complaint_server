const { Expense, validSchema } = require("../models/expense");
const accountHistory = require("../models/accountHistory");
const Joi = require("joi");

module.exports = {
  //Create Expense
  async create(req, res, next) {
    //validation
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const data = Expense(req.body);
    try {
      await data.save((error, success) => {
        if (error) {
          return next(error);
        }
        
        const result = accountHistory({
          Id: success._id,
          amount: success.amount,
        });
        result.save();
      });
      res.status(201).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
  //Get all Expense
  async get(req, res, next) {
    try {
      const data = await Expense.find().exec();
      res.status(202).json(data);
    } catch (err) {
      return next(err);
    }
  },
  //Update Expense
  async update(req, res, next) {
    const { error } = validSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const data = await Expense.findByIdAndUpdate(
        req.body._id,
        {
          paymentType: req.body.paymentType,
          amount: req.body.amount,
          to: req.body.to,
          comment: req.body.comment,
          paidby: req.body.paidby,
        },
        { new: true }
      ).then((success) => {
        accountHistory.findOneAndUpdate(
          success._id,
          {
            Id: success._id,
            amount: success.amount,
          },
          { new: true }
        );
      }).catch((err) => {
        next(err);
      });
      res.status(200).json({ success: true, data });
    } catch (err) {
      return next(err);
    }
  },
};
