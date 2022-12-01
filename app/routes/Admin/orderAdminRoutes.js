const express = require("express").Router;
const router = express();
const OrderAdminControllers = require("../../controllers/Admin/orderAdminControllers");

/**
 * @swagger
 * /admin/order:
 *   get:
 *     description: List Orders
 *     deprecated: true
 *     summary: List Orders
 *     operationId: adminListOrders
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *       - Admin / Order
 *     responses:
 *       200:
 *         description: Order listed.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                 - $ref: "#/components/schemas/Order"
 *                 - type: object
 *                   properties:
 *                     User:
 *                       $ref: "#/components/schemas/User"
 *                     Car:
 *                       $ref: "#/components/schemas/Car"
 */
router.get("/", OrderAdminControllers.getOrders);

/**
 * @swagger
 * /admin/order/{id}:
 *   get:
 *     description: Get Order
 *     summary: Get Order
 *     operationId: adminGetOrder
 *     security:
 *       - AdminAccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           format: int32
 *     tags:
 *       - Admin / Order
 *     responses:
 *       200:
 *         description: Order retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: "#/components/schemas/Order"
 *               - type: object
 *                 properties:
 *                   User:
 *                     $ref: "#/components/schemas/User"
 *                   Car:
 *                     $ref: "#/components/schemas/Car"
 */
router.get("/:id", OrderAdminControllers.getOrderById);

/**
 * @swagger
 * /admin/order/{id}:
 *   patch:
 *     description: Change Order Status
 *     summary: Change Order Status
 *     operationId: adminChangeOrderStatus
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *     - Admin / Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The car ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 description: 0 or 1
 *                 example: 1
 *     responses:
 *       200:
 *         description: Order status updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       404:
 *         description: Order not found
 */
router.patch("/:id", OrderAdminControllers.changeStatus);

/**
 * @swagger
 * /admin/order/{id}:
 *   delete:
 *     operationId: adminDeleteOrder
 *     description: Delete Order
 *     summary: Delete Order
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *       - Admin / Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Car Id
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.delete("/:id", OrderAdminControllers.deleteOrder);

module.exports = router;
