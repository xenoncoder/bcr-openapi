const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_TOKEN);
};

module.exports = { signToken, verifyToken };