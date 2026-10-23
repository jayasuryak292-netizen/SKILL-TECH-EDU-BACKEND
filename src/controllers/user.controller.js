const User = require("../models/User");

async function getAllUsers(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: ["id", "fullName", "email", "role", "status"],
      order: [["id", "ASC"]]
    });

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: { users }
    });
  } catch (error) {
    return next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const userId = Number(req.params.id);

    if (!Number.isSafeInteger(userId) || userId < 1) {
      return res.status(400).json({
        success: false,
        message: "A valid user ID is required"
      });
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "fullName", "email", "role", "status"]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: { user }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById
};
