require("dotenv").config();
const { SECRET_TOKEN } = process.env;
const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  const token = jwt.sign(payload, SECRET_TOKEN);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_TOKEN);
};

module.exports = { signToken, verifyToken };