const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ALLOWED_ROLES = [
  "super_admin",
  "main_admin",
  "staff",
  "student"
];

function createServiceError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function createUser({
  fullName,
  email,
  password,
  role = "student"
} = {}) {
  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string"
  ) {
    throw createServiceError(
      "Full name, email, and password are required",
      400
    );
  }

  const normalizedName = fullName.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedName.length > 150) {
    throw createServiceError(
      "Full name must not exceed 150 characters",
      400
    );
  }

  if (normalizedEmail.length > 254) {
    throw createServiceError(
      "Email must not exceed 254 characters",
      400
    );
  }

  if (password.length < 8 || password.length > 72) {
    throw createServiceError(
      "Password must be between 8 and 72 characters long",
      400
    );
  }

  if (!ALLOWED_ROLES.includes(role)) {
    throw createServiceError("Invalid user role", 400);
  }

  const existingUser = await User.findOne({
    where: { email: normalizedEmail }
  });

  if (existingUser) {
    throw createServiceError(
      "A user with this email already exists",
      409
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      fullName: normalizedName,
      email: normalizedEmail,
      passwordHash,
      role,
      status: "active"
    });

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status
    };
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw createServiceError(
        "A user with this email already exists",
        409
      );
    }

    throw error;
  }
}

module.exports = {
  createUser
};
