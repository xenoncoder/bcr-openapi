const express = require("express").Router;
const router = express();
const CarAdminControllers = require("../../controllers/Admin/carAdminControllers");

/**
 * @swagger
 * /api/admin/cars:
 *   get:
 *     summary: List Cars
 *     operationId: listCars
 *     description: List Cars
 *     deprecated: true
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *     - Admin / Car
 *     responses:
 *       200:
 *         description: List of cars displayed on the response.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Car"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.get("/", CarAdminControllers.getCarsAdmin);

/**
 * @swagger
 * /api/admin/cars/{id}:
 *   get:
 *     description: Fetch Car ById
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *     - Admin / Car
 *     parameters:
 *      - in: path
 *        name: id
 *        description: Car ID
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Car information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Car"
 *       404:
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Not found"
 *                 message:
 *                   type: string
 *                   example: "Car with 'id = 0' not found"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.get("/:id", CarAdminControllers.getCarByIdAdmin);

/**
 * @swagger
 * /api/admin/cars:
 *   post:
 *     operationId: createCar
 *     description: Add a New Car
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *     - Admin / Car
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Car name
 *                 example: Innova
 *               category:
 *                 type: string
 *                 description: Capacity of car
 *                 example: small
 *               price:
 *                 type: number
 *                 format: int32
 *                 example: 5000000
 *                 description: Rent fee per day
 *               status:
 *                 type: boolean
 *                 description: If true means car is currently being rented
 *                 example: false
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Car image as file
 *                 example: innova.png
 *     responses:
 *       201:
 *         description: New car added to the database.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Car"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.post("/", CarAdminControllers.addCarAdmin);

/**
 * @swagger
 * /api/admin/cars/{id}:
 *   put:
 *     description: Update Car ById
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *     - Admin / Car
 *     parameters:
 *      - in: path
 *        name: id
 *        description: Car ID
 *        required: true
 *        schema:
 *          type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of car
 *                 example: Innova
 *               category:
 *                 type: string
 *                 description: capacity of car
 *                 example: small
 *               price:
 *                 type: integer
 *                 example: 5000000
 *                 description: price per day
 *               status:
 *                 type: boolean
 *                 description: If true, it means that the car is on rent.
 *                 example: false
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Car image.
 *                 example: innova.png
 *     responses:
 *       200:
 *         description: Car updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Car"
 *       404:
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Not found"
 *                 message:
 *                   type: string
 *                   example: "Car with 'id = 0' not found"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.patch("/:id", CarAdminControllers.editCarAdmin);

/**
 * @swagger
 * /api/admin/cars/{id}:
 *   delete:
 *     description: Delete Car ById
 *     security:
 *       - AdminAccessToken: []
 *     tags:
 *     - Admin / Car
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          description: Car ID
 *     responses:
 *       200:
 *         description: Car deleted.
 *       404:
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Not found"
 *                 message:
 *                   type: string
 *                   example: "Car with 'id = 0' not found"
 *       500:
 *         $ref: "#/components/responses/InternalServerError"
 */
router.delete("/:id", CarAdminControllers.deleteCarAdmin);

module.exports = router;
