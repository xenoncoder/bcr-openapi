const express = require("express").Router;
const router = express();
const UserAdminControllers = require("../../controllers/Admin/userAdminControllers");

/**
 * @swagger
 * /api/admin/auth/register:
 *   post:
 *     description: Registering admin
 *     summary: Register
 *     operationId: adminRegister
 *     tags:
 *       - Admin / Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Your email
 *                 example: admin@g0r00t.my.id
 *               password:
 *                 type: string
 *                 description: Your password
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 description: Your role
 *                 enum:
 *                   - Admin
 *                   - Customer
 *     responses:
 *       201:
 *         description: You're registered.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Email Already Exists.
 */
router.post("/register", UserAdminControllers.registerAdmin);

/**
 * @swagger
 * /api/admin/auth/login:
 *   post:
 *     operationId: adminLogin
 *     hidden: true
 *     description: Login
 *     summary: Login
 *     tags:
 *       - Admin / Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Your email
 *                 example: admin@g0r00t.my.id
 *               password:
 *                 type: string
 *                 description: Your password
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: You're logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: admin@g0r00t.my.id
 *                 role:
 *                   type: string
 *                   example: Admin
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc
 *       400:
 *         description: Email Already Exists.
 */
router.post("/login", UserAdminControllers.loginAdmin);

module.exports = router;
