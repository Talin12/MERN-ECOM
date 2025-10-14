const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');

const authUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password });
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authUser, registerUser };