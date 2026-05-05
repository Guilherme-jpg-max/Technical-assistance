require("dotenv").config();
const connectDB = require('./database');
connectDB();
module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "secretKey",

};