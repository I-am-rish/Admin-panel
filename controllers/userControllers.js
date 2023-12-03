const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

exports.registerUser = async (req, res, next) => {
  const { name, email, mobile, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      // create a new user and save it to the database
      user = new User({
        name,
        email,
        mobile,
        password,
      });
      await user.save();
      return res.status(201).json({ message: "User created" });
    } else {
      throw Error(`User already exist.`);
    }
  } catch (error) {
    return res.status(409).send(error.message);
  }
};

//login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      throw Error("Invalid Email or Password");
    } else {
        const isPasswordMatched = await user.comparePasswords(password);
      if (isPasswordMatched) {
        sendToken(user, 200, res);
      } else {
        throw Error("Invalid Email or Password");
      }
    }
  } catch (err) {
    return res.status(403).send(err.message);
  }
};

//logout user
exports.logOutUser = async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({
    msg: 'Logged out'
  })
};

//get single user
exports.getSingleUser = async (req, res, next) => {
  const id = req.query.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw Error("No user found");
    } else {
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

//get all user (admin)
exports.allUsers = async (req, res, next) => {
  try {
    let users = await User.find();
    if (!users) {
      throw new Error("No Users Found");
    }
    return res.status(200).json({ success: true, data: { users } });
  } catch (error) {
    return res.status(400).json({ msg: "Error in fetching the users", error });
  }
};
