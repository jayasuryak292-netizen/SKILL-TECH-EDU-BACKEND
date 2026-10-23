require("dotenv").config();

function getNumber(value, fallback, name) {
  const parsed = Number(value ?? fallback);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return parsed;
}

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: getNumber(process.env.PORT, 3000, "PORT"),

  database: {
    host: process.env.DB_HOST || "localhost",
    port: getNumber(process.env.DB_PORT, 3306, "DB_PORT"),
    name: process.env.DB_NAME || "skill_tech_edu",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || ""
  },

  jwt: {
    secret: process.env.JWT_SECRET || "",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  }
};

module.exports = env;
