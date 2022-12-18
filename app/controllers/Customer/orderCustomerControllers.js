require('dotenv').config();
const {FIREBASE_STORAGE_BUCKET} = process.env;
const {Car, Order, User} = require('../../databases/models');
const slugify = require('slugify');
const firebase = require('../../helpers/firebaseHelpers');

class OrderCustomerControllers {
  static async addOrderCustomer(req, res) {
    try {
      const {startRentAt, finishRentAt, carId} = req.body;
      const totalDay =
        (new Date(finishRentAt) - new Date(startRentAt)) / 86400000;
      const car = await Car.findOne({
        where: {carId},
        rejectOnEmpty: true,
      });

      if (!car) {
        return res.status(404).json({
          name: 'Not Found',
          message: `Car with id = ${carId} is not Found`,
        });
      }

      const totalPrice = (totalDay + 1) * car.price;
      const newOrder = await Order.create({
        startRentAt,
        status: false,
        finishRentAt,
        userId: req.client.id,
        carId: car.id,
        totalPrice,
      });

      res.status(201).json(newOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async uploadSlipOrderCustomer(req, res) {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
          name: 'Bad Request',
          message: 'Slip is required',
        });
      }

      const order = await Order.findOne({
        where: {
          id: req.params.id,
          userId: req.client.id,
        },
      });

      if (!order) {
        return res.status(404).json({
          name: 'Not found',
          message: `Order with id = ${req.params.id} not found!`,
        });
      }

      const image = req.files.slip;
      const imageName = slugify(`${Number(new Date())}-${image.name}`);
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/uploads%2Forders%2F${imageName}?alt=media`;

      await firebase
          .file(`uploads/orders/${imageName}`)
          .createWriteStream()
          .end(req.files.slip.data);

      order.slip = imageUrl;
      await order.save();

      return res.status(200).json(order);
    } catch (err) {
      res.status(500).json({
        name: 'Internal server error',
        message: err.message,
      });
    }
  }

  static async getOrdersCustomer(req, res) {
    try {
      const orders = await Order.findAll(
          {
            where: {
              userId: req.client.id,
            },
          },
          {
            include: [
              {
                model: User,
                attributes: {
                  exclude: ['id', 'password', 'createdAt', 'updatedAt'],
                },
              },
              {
                model: Car,
                attributes: {
                  exclude: ['id', 'createdAt', 'updatedAt'],
                },
              },
            ],
          },
      );
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getOrderByIdCustomer(req, res) {
    try {
      const id = req.params.id;
      const order = await Order.findByPk(id, {
        rejectOnEmpty: true,
        include: [
          {
            model: User,
            attributes: {
              exclude: ['id', 'password', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: Car,
            attributes: {
              exclude: ['id', 'createdAt', 'updatedAt'],
            },
          },
        ],
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateOrderCustomer(req, res) {
    try {
      const id = req.params.id;
      const {startRentAt, finishRentAt, carId} = req.body;
      const totalDay =
        (new Date(finishRentAt) - new Date(startRentAt)) / 86400000;
      const car = await Car.findOne({
        where: {carId},
        rejectOnEmpty: true,
      });

      const totalPrice = (totalDay + 1) * car.price;
      const updateOrder = await Order.update(
          {
            startRentAt,
            finishRentAt,
            userId: req.client.id,
            carId: car.id,
            totalPrice,
          },
          {
            where: {
              id,
            },
            returning: 1,
          },
      );
      res.status(200).json(updateOrder[1][0]);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteOrderCustomer(req, res) {
    try {
      const id = req.params.id;
      const data = await Order.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.status(200).json({
          name: 'Delete Success',
          message: `Order with id = ${id} has been delete`,
        });
      } else {
        res.status(400).json({
          name: 'Not Found',
          message: `Order with id = ${id} is not Found`,
        });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = OrderCustomerControllers;
