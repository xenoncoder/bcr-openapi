const { Car } = require("../../databases/models");

class CarCustomerControllers {
  static async getCarsCustomer(req, res) {
    try {
      const data = await Car.findAll();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getCarByIdCustomer(req, res) {
    try {
      const id = req.params.id;
      const car = await Car.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({
          name: "Not Found",
          message: `Car with id = ${id} is not Found`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CarCustomerControllers;