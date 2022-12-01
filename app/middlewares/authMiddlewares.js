"use strict";
const { User } = require("../databases/models");
const { verifyToken } = require("../helpers/jwtHelpers");

class AuthMiddlewares {
  static async serverAuth(req, res, next) {
    try {
      const decoded = verifyToken(req.headers.accessToken);

      const data = await User.findOne({
        where: {
          email: decoded.email,
        },
      });

      if (data === null || data.role !== "Admin") {
        res
          .status(401)
          .json({ name: "unauthorized", message: "you are not admin" });
      } else {
        req.admin = data;
        next();
      }
    } catch (err) {
      res.status(401).json({
        name: "unauthorized",
        message: `you don't have access token`,
      });
    }
  }
  static async clientAuth(req, res, next) {
    try {
      const decoded = verifyToken(req.headers.accessToken);

      const data = await User.findOne({
        where: {
          email: decoded.email,
        },
      });

      if (data === null) {
        res.status(401).json({
          name: "unauthorized",
          message: `you don't have access token`,
        });
      } else {
        req.client = data;
        next();
      }
    } catch (err) {
      res.status(401).json({
        name: "unauthorized",
        message: `you don't have access token`,
      });
    }
  }
}

module.exports = AuthMiddlewares;