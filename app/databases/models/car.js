'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      Car.hasMany(models.Order, {
        sourceKey: 'id',
        foreignKey: 'carId',
      });
    }
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     Car:
   *       type: object
   *       properties:
   *         id:
   *           type: number
   *           format: int32
   *           example: 1
   *         name:
   *           type: string
   *           example: Toyota Avanza
   *         category:
   *           type: string
   *           enum:
   *           - small
   *           - medium
   *           - large
   *           example: medium
   *         price:
   *           type: number
   *           format: int32
   *           example: 100000
   *         status:
   *           type: boolean
   *           example: false
   *         startRentAt:
   *           type: string
   *           format: date
   *           example: 2022-01-01
   *         finishRentAt:
   *           type: string
   *           format: date
   *           example: 2022-01-02
   *         image:
   *           type: string
   *           format: uri
   *           example: https://upload.wikimedia.org/wikipedia/commons/0/0d/2019_Toyota_Avanza_1.3_G_F653RM_%2820200228%29.jpg
   *         createdAt:
   *           type: string
   *           format: date-time
   *         updateAt:
   *           type: string
   *           format: date-time
   */
  Car.init(
      {
        name: DataTypes.STRING,
        category: {
          type: DataTypes.ENUM,
          values: ['small', 'medium', 'large'],
        },
        price: DataTypes.INTEGER,
        status: {
          type: DataTypes.ENUM,
          values: ['true', 'false'],
        },
        image: DataTypes.STRING,
        startRentAt: DataTypes.DATE,
        finishRentAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Car',
      },
  );
  return Car;
};
