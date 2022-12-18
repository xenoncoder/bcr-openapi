const express = require('express').Router;
const router = express();
const routerAdmin = require('./Admin');
const routerCustomer = require('./Customer');

/**
 * @swagger
 * components:
 *   responses:
 *     InternalServerError:
 *       description: When something went wrong.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Internal Server Error
 *               message:
 *                 type: string
 *                 example: Something went wrong.
 * */
router.use('/api/admin', routerAdmin);
router.use('/api/customer', routerCustomer);

module.exports = router;
