const { User } = require("../../databases/models");
const { comparePassword } = require("../../helpers/bcryptHelpers");
const { signToken } = require("../../helpers/jwtHelpers");

class UserAdminControllers {
  static async registerAdmin(req, res) {
    try {
      const { email, password, role } = req.body;
      const user = await User.findOne({
        where: { email },
        rejectOnEmpty: false,
      });
      if (user) {
        res.status(400).json({
          name: "Bad Request",
          message: "Email Already exists.",
        });
      } else {
        const data = await User.create({ email, password, role });
        res.status(201).json(data);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      const userExists = await User.findOne({
        where: { email },
        rejectOnEmpty: false,
      });
      if (!userExists) {
        res.status(404).json({
          name: "Not Found",
          message: "Email not found.",
        });
      } else if (!comparePassword(password, userExists.password)) {
        res.status(400).json({
          name: "Bad Request",
          message: "Password was Wrong.",
        });
      } else {
        const user = { email: userExists.email, role: userExists.role };
        user.accessToken = signToken(user);
        res.status(201).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserAdminControllers;
