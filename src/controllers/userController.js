const { User, validSchema } = require("../models/user");
const CustomErrorHandler = require("../services/customErrorHnadler");
const JwtService = require("../services/jwtService");
const bcrypt = require("bcrypt");
module.exports = {
  //SignUp User
  async signUp(req, res, next) {
    // Validation
    const { error } = validSchema.validate(req.body);
    if (error) return next(error);

    // check if user is in the database already
    try {
      const isEmail = await User.exists({ email: req.body.email });
      if (isEmail) {
        return next(
          CustomErrorHandler.alreadyExixt("This email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }

    const data = User(req.body);

    let access_token;
    try {
      //hash password
      data.password = await bcrypt.hash(data.password, 10);

      const result = await data.save();

      //token
      access_token = JwtService.sign({
        _id: result._id,
        userType: result.userType,
      });

      //jwt store in cookies
      res.cookie("jwt", access_token, { httpOnly: true });

      res.status(201).json({ success: true, access_token });
    } catch (err) {
      return next(err);
    }
  },
  //Signin User
  async signIn(req, res, next) {
    // Validation
    const authSchema = validSchema.fork(
      ["name", "userType", "confirmPassword"],
      (schema) => schema.optional()
    );
    const { error } = authSchema.validate(req.body);
    if (error) return next(error);

    try {
      const user = await User.findOne({ email: req.body.email });
      // check if user is in the database already
      if (!user) {
        return next(
          CustomErrorHandler.wrongCredentials("Please Enter Valid Email.")
        );
      }

      // compare the password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(
          CustomErrorHandler.wrongCredentials("Please Enter Valid Password.")
        );
      }

      // Toekn
      const access_token = JwtService.sign({
        _id: user._id,
        userType: user.userType,
      });

      //jwt store in cookies
      res.cookie("jwt", access_token, { httpOnly: true });

      res.status(200).json({ success: true, access_token });
    } catch (err) {
      return next(err);
    }
  },

};
