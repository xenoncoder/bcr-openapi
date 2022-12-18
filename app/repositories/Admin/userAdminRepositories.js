const {User} = require('../../databases/models');

class UserAdminRepositories {
  static async registerAdmin({email, password, role}) {
    return await User.create({email, password, role});
  }

  static async getAdminUserByEmail({email}) {
    return await User.findOne({
      where: {email},
      rejectOnEmpty: false,
    });
  }
}

module.exports = UserAdminRepositories;
