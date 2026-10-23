"use strict";

require("dotenv").config();

const env = require("./env");

const commonConfig = {
  username: env.database.user,
  password: env.database.password,
  database: env.database.name,
  host: env.database.host,
  port: env.database.port,
  dialect: "mysql",
  logging: false
};

module.exports = {
  development: {
    ...commonConfig
  },

  test: {
    ...commonConfig,
    database: `${env.database.name}_test`
  },

  production: {
    ...commonConfig
  }
};
