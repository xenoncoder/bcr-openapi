require('dotenv').config();
const {FIREBASE_STORAGE_BUCKET} = process.env;
const {Car} = require('../../databases/models');
const firebase = require('../../helpers/firebaseHelpers');

class CarAdminControllers {
  static async addCarAdmin(req, res) {
    try {
      const {name, category, price, status} = req.body;
      const searchCar = await Car.findOne({
        where: {name},
        rejectOnEmpty: false,
      });
      if (searchCar) {
        res.status(400).json({
          message: 'Mobil Sudah Ada',
        });
      } else {
        let addImgUrl;
        if (!req.files || Object.keys(req.files).length === 0) {
          addImgUrl = null;
        } else {
          const image = req.files.image;
          let imgName = `mobil-${Number(new Date())}-${image.name}`;
          imgName = imgName.replace(/ /g, '_');
          addImgUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/uploads%2Fcars%2F${imgName}?alt=media`;
          await firebase
              .file(`uploads/cars/${imgName}`)
              .createWriteStream()
              .end(req.files.image.data);
        }

        const data = await Car.create({
          name,
          category,
          price,
          status,
          image: addImgUrl,
        });
        res.status(201).json({message: 'Mobil Berhasil Ditambahkan', data});
      }
    } catch (err) {
      res.status(500).json({message: 'Gagal Menambahkan Mobil', err});
    }
  }

  static async getCarsAdmin(req, res) {
    try {
      const data = await Car.findAll({order: [['id', 'ASC']]});
      res
          .status(200)
          .json({message: 'Berhasil Menampilkan Daftar Mobil', data});
    } catch (err) {
      res.status(500).json({message: 'Gagal Menampilkan Daftar Mobil', err});
    }
  }

  static async getCarByIdAdmin(req, res) {
    try {
      const id = req.params.id;
      const data = await Car.findOne({
        where: {id},
        rejectOnEmpty: true,
      });
      res
          .status(200)
          .json({message: 'Berhasil Menampilkan Detail Mobil', data});
    } catch (err) {
      res.status(500).json({message: 'Gagal Menampilkan Detail Mobil', err});
    }
  }

  static async editCarAdmin(req, res) {
    try {
      const id = req.params.id;
      const {name, category, price} = req.body;
      const searchCar = await Car.findOne({
        where: {name},
        rejectOnEmpty: false,
      });
      if (searchCar) {
        res.status(400).json({
          message: 'Mobil Sudah Ada',
        });
      } else {
        let editImgUrl;
        if (!req.files || Object.keys(req.files).length === 0) {
          editImgUrl = null;
        } else {
          const image = req.files.image;
          let imgName = `mobil-${Number(new Date())}-${image.name}`;
          imgName = imgName.replace(/ /g, '_');
          editImgUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o/uploads%2Fcars%2F${imgName}?alt=media`;
          await firebase
              .file(`uploads/cars/${imgName}`)
              .createWriteStream()
              .end(req.files.image.data);
        }
        const data = await Car.update(
            {
              name,
              category,
              price,
              image: editImgUrl,
            },
            {
              where: {id},
              returning: 1,
            },
        );
        if (data[0]) {
          res.status(200).json(data[1][0]);
        } else {
          res.status(400).json({
            message: `Mobil Dengan ID = ${id} Tidak Ada`,
          });
        }
      }
    } catch (err) {
      res.status(500).json({message: 'Gagal Memperbaharui Mobil', err});
    }
  }

  static async deleteCarAdmin(req, res) {
    try {
      const id = req.params.id;
      const data = await Car.destroy({
        where: {
          id,
        },
      });
      if (data) {
        res.status(200).json({
          message: `Berhasil Menghapus Mobil Dengan ID = ${id}`,
        });
      } else {
        res.status(404).json({
          message: `Mobil Dengan ID = ${id} Tidak Ada`,
        });
      }
    } catch (err) {
      res.status(500).json({message: `Gagal Menghapus Mobil`, err});
    }
  }
}

module.exports = CarAdminControllers;
