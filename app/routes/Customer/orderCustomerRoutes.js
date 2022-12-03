const express = require("express").Router;
const router = express();
const OrderCustomerControllers = require("../../controllers/Customer/orderCustomerControllers");

/**
 * @swagger
 * /api/customer/order:
 *   post:
 *     summary: Create new order
 *     description: Create new order
 *     operationId: customerCreateOrder
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startRentAt:
 *                 type: string
 *                 description: start date YYYY-MM-DD
 *                 example: 2022-10-05
 *               finishRentAt:
 *                 type: string
 *                 description: finish date YYYY-MM-DD
 *                 example: 2022-10-12
 *               carId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 */
router.post("/", OrderCustomerControllers.addOrderCustomer);

/**
 * @swagger
 * /customer/order:
 *   get:
 *     summary: List orders
 *     description: List orders
 *     operationId: customerListOrders
 *     deprecated: true
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     responses:
 *       200:
 *         description: Order listed.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: "#/components/schemas/Order"
 *                   - type: object
 *                     properties:
 *                       User:
 *                         $ref: "#/components/schemas/User"
 *                       Car:
 *                         $ref: "#/components/schemas/Car"
 */
router.get("/", OrderCustomerControllers.getOrdersCustomer);

/**
 * @swagger
 * /customer/order/{id}:
 *   get:
 *     summary: Get order
 *     description: Get order
 *     operationId: customerGetOrder
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     responses:
 *       200:
 *         description: Order retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/Order"
 *                 - type: object
 *                   properties:
 *                     User:
 *                       $ref: "#/components/schemas/User"
 *                     Car:
 *                       $ref: "#/components/schemas/Car"
 */
router.get("/:id", OrderCustomerControllers.getOrderByIdCustomer);

/**
 * @swagger
 * /customer/order/{id}/slip:
 *   put:
 *     summary: Upload payment slip
 *     description: Upload payment slip
 *     operationId: customerUploadPaymentSlip
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               slip:
 *                 type: string
 *                 format: binary
 *                 description: Payment slip file
 *                 example: screenshot.png
 *     responses:
 *       200:
 *         description: Order retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 */
router.put("/:id/slip", OrderCustomerControllers.uploadSlipOrderCustomer);

/**
 * @swagger
 * /customer/order/{id}:
 *   put:
 *     summary: Update order
 *     description: Update order
 *     deprecated: true
 *     operationId: customerUpdateOrder
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startRentAt:
 *                 type: string
 *                 description: start date YYYY-MM-DD
 *                 example: 2022-10-05
 *               finishRentAt:
 *                 type: string
 *                 description: finish date YYYY-MM-DD
 *                 example: 2022-10-12
 *               carId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Order retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 */
router.put("/:id", OrderCustomerControllers.updateOrderCustomer);

/**
 * @swagger
 * /customer/order/{id}:
 *   delete:
 *     summary: Delete order
 *     description: Delete order
 *     operationId: customerDeleteOrder
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *           format: int32
 *           example: 1
 *     security:
 *       - CustomerAccessToken: []
 *     tags:
 *       - Customer / Order
 *     responses:
 *       200:
 *         description: Order deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Delete success"
 *                 message:
 *                   type: string
 *                   example: "Order with id = 1 has been deleted"
 */
router.delete("/:id", OrderCustomerControllers.deleteOrderCustomer);

module.exports = router;
