'use strict';
const {hashPassword} = require('../../helpers/bcryptHelpers');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, {
        sourceKey: 'id',
        foreignKey: 'userId',
      });
    }
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       properties:
   *         email:
   *           type: string
   *           format: email
   *           example: rainpedia@g0r00t.my.id
   *         role:
   *           type: string
   *           enum:
   *           - Admin
   *           - Customer
   */
  User.init(
      {
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [6],
              msg: 'password must be at least 6 characters',
            },
          },
        },
        role: {
          type: DataTypes.ENUM(['Admin', 'Customer']),
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        hooks: {
          beforeCreate: (user) => {
            user.password = hashPassword(user.password);
          },
        },
        sequelize,
        modelName: 'User',
      },
  );
  return User;
};
