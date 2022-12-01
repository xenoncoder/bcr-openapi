const express = require("express").Router;
const router = express();

const routerAdminUser = require("./userAdminRoutes");
const routerAdminCar = require("./carAdminRoutes");
const routerAdminOrder = require("./orderAdminRoutes");
const authAdmin = require("../../middlewares/authMiddlewares");

router.use("/auth", routerAdminUser);
router.use("/cars", authAdmin.serverAuth, routerAdminCar);
router.use("/orders", authAdmin.serverAuth, routerAdminOrder);

module.exports = router;
