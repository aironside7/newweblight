const { Router } = require('express');
const { authenticationMiddleware } = require('../middlewares/authentication.middleware');
const { authorizationMiddleware } = require('../middlewares/authorization.middleware');
const { Role } = require('../models/user.model');
const {
  createOrderHandler,
  getOrdersHandler,
  getOrderByIdHandler,
  updateOrderHandler,
  deleteOrderHandler,
} = require('../controllers/order.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               customerId: customer_id_123
 *               productIds: ["product_id_1", "product_id_2"]
 *     responses:
 *       '201':
 *         description: Order created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
router.post('/', authenticationMiddleware, createOrderHandler);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of orders
 *       '500':
 *         description: Server error
 */
router.get('/', authenticationMiddleware, authorizationMiddleware(Role.Admin), getOrdersHandler);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       '200':
 *         description: Order data
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Server error
 */
router.get('/:id', authenticationMiddleware, getOrderByIdHandler);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               customerId: updated_customer_id_123
 *               productIds: ["updated_product_id_1", "updated_product_id_2"]
 *     responses:
 *       '200':
 *         description: Updated order data
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Server error
 */
router.put('/:id', authenticationMiddleware, updateOrderHandler);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       '204':
 *         description: Order deleted successfully
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Server error
 */
router.delete('/:id', authenticationMiddleware, deleteOrderHandler);

module.exports = router;
