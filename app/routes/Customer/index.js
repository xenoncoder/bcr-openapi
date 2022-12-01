const express = require("express").Router;
const router = express();
const routerCustomerUser = require("./userCustomerRoutes");
const routerCustomerOrder = require("./orderCustomerRoutes");
const authCustomer = require("../../middlewares/authMiddlewares");

router.use("/auth", routerCustomerUser);
router.use("/order", authCustomer.clientAuth, routerCustomerOrder);

module.exports = router;