const userService = require("../services/user.service");

async function createUser(req, res, next) {
  try {
    const { fullName, email, password, role } = req.body || {};

    // Only super_admin can create another super_admin.
    if (
      role === "super_admin" &&
      req.user.role !== "super_admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Only a super admin can create a super admin"
      });
    }

    const user = await userService.createUser({
      fullName,
      email,
      password,
      role
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user }
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }

    return next(error);
  }
}

module.exports = {
  createUser
};
