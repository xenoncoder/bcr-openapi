"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Car);
      Order.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "userId",
      });
    }
  }

  /**
   * @swagger
   * components:
   *   schemas:
   *     Order:
   *       type: object
   *       properties:
   *         id:
   *           type: number
   *           format: int32
   *           example: 1
   *         totalPrice:
   *           type: number
   *           format: int32
   *           example: 100000
   *         startRentAt:
   *           type: string
   *           format: date
   *           example: 2022-01-01
   *         finishRentAt:
   *           type: string
   *           format: date
   *           example: 2022-01-02
   *         status:
   *           type: boolean
   *           example: false
   *         slip:
   *           type: string
   *           format: uri
   *           example: https://www.jurnal.id/wp-content/uploads/2021/09/contoh-nota-kosong-434x628.png
   *         userId:
   *           type: number
   *           format: int32
   *           example: 1
   *         carId:
   *           type: number
   *           format: int32
   *           example: 1
   */
  Order.init(
    {
      totalPrice: DataTypes.INTEGER,
      startRentAt: DataTypes.DATE,
      finishRentAt: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      slip: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      carId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
