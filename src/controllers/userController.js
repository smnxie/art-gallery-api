const User = require("../models/User");

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body || {};
    const update = {};

    if (username !== undefined) update.username = username;
    if (email !== undefined) update.email = email;

    const user = await User.findByIdAndUpdate(req.user, update, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    next(err);
  }
};


module.exports = { getProfile, updateProfile };

