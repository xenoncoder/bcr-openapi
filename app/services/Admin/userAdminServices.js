const UserAdminRepositories = require('../../repositories/Admin/userAdminRepositories');
const {comparePassword} = require('../../helpers/bcryptHelpers');
const {signToken} = require('../../helpers/jwtHelpers');

class UserAdminServices {
  static async registerAdmin({email, password, role}) {
    try {
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: 'Email Can\'t Be Empty',
          data: {
            email: null,
          },
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: 'Password Can\'t Be Empty',
          data: {
            password: null,
          },
        };
      }

      if (!role) {
        return {
          status: false,
          status_code: 400,
          message: 'Role User Can\'t Be Empty',
          data: {
            role: null,
          },
        };
      }

      const emailExists = await UserAdminRepositories.getAdminUserByEmail({
        email,
      });
      if (!emailExists) {
        const createdUser = await UserAdminRepositories.registerAdmin({
          email,
          password,
          role,
        });

        return {
          status: true,
          status_code: 201,
          message: 'Admin Added Successfully',
          data: {
            registered_user: createdUser,
          },
        };
      } else {
        return {
          status: false,
          status_code: 400,
          message: 'Email Already Exists',
          data: {
            email: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {},
      };
    }
  }

  static async loginAdmin({email, password}) {
    try {
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: 'Email Can\'t Be Empty',
          data: {
            email: null,
          },
        };
      }

      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: 'Password Can\'t Be Empty',
          data: {
            password: null,
          },
        };
      }

      const userExists = await UserAdminRepositories.getAdminUserByEmail({
        email,
      });
      if (!userExists) {
        return {
          status: false,
          status_code: 404,
          message: 'Email Not Found',
          data: {
            email: null,
          },
        };
      } else if (!comparePassword(password, userExists.password)) {
        return {
          status: false,
          status_code: 400,
          message: 'Password Wrong',
          data: {
            password: null,
          },
        };
      } else {
        const user = {email: userExists.email, role: userExists.role};
        user.access_token = signToken(user);
        return {
          status: false,
          status_code: 400,
          message: 'Login Success',
          data: {
            user,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}

module.exports = UserAdminServices;
