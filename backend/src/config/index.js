require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

// 1. Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// 2. Auto-load all models in src/models
const models = {};
const modelsPath = path.join(__dirname, "..", "models");

fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(modelsPath, file));
    models[model.name] = model;
  });

// 3. Apply associations if defined
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// 4. Config object
const config = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "supersecretkey",
    expiresIn: "1d",
  },
};

module.exports = { config, sequelize, models };
