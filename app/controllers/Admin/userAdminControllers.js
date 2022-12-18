const UserAdminServices = require('../../services/Admin/userAdminServices');

class UserAdminControllers {
  static async registerAdmin(req, res) {
    const {email, password, role} = req.body;
    const {status, status_code, message, data} =
      await UserAdminServices.registerAdmin({
        email,
        password,
        role,
      });

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
  }

  static async loginAdmin(req, res) {
    const {email, password} = req.body;
    const {status, status_code, message, data} =
      await UserAdminServices.loginAdmin({
        email,
        password,
      });

    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
  }
}

module.exports = UserAdminControllers;
