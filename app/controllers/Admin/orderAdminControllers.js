const { Car, Order, User } = require("../../databases/models");

class OrderAdminControllers {
  static async getOrders(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["id", "password", "createdAt", "updatedAt"],
            },
          },
          {
            model: Car,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOrderById(req, res) {
    try {
      const id = req.params.id;
      const order = await Order.findByPk(id, {
        rejectOnEmpty: true,
        include: [
          {
            model: User,
            attributes: {
              exclude: ["id", "password", "createdAt", "updatedAt"],
            },
          },
          {
            model: Car,
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async changeStatus(req, res) {
    try {
      const id = req.params.id;
      const status = Number(req.body.status);
      const order = await Order.update(
        {
          status: true,
        },
        {
          where: {
            id,
          },
          returning: 1,
        }
      );
      if (order[1] === 0) {
        return res.status(404).json({
          name: "Not Found",
          message: `Order with id = ${id} is not Found`,
        });
      } else {
        if (status === 1) {
          await Car.update(
            {
              startRentAt: order[1][0].startRentAt,
              finishRentAt: order[1][0].finishRentAt,
              status: true,
            },
            {
              where: {
                id: order[1][0].carId,
              },
            }
          );
          res
            .status(200)
            .json({ name: "Success", message: `Car start to rent` });
        } else {
          await Car.update(
            {
              startRentAt: null,
              finishRentAt: null,
              status: false,
            },
            {
              where: {
                id: order[1][0].carId,
              },
            }
          );
          res
            .status(200)
            .json({ name: "Success", message: "Finish rent car." });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteOrder(req, res) {
    try {
      const id = req.params.id;
      const data = await Order.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.status(200).json({
          name: "Delete Success",
          message: `Order with id = ${id} has been delete`,
        });
      } else {
        res.status(404).json({
          name: "Not Found",
          message: `Order with id = ${id} is not Found`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = OrderAdminControllers;
