const { Router } = require('express');
const { authenticationMiddleware } = require('../middlewares/authentication.middleware');
const { authorizationMiddleware } = require('../middlewares/authorization.middleware');
const { Role } = require('../models/user.model');
const {
  createCustomerHandler,
  getCustomersHandler,
  getCustomerByIdHandler,
  updateCustomerHandler,
  deleteCustomerHandler,
} = require('../controllers/customer.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer management endpoints
 */

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               name: new user
 *               email: new@example.com
 *               phone: "123-456-7890"
 *     responses:
 *       '201':
 *         description: Customer created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
router.post('/', authenticationMiddleware, authorizationMiddleware(Role.Admin), createCustomerHandler);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of customers
 *       '500':
 *         description: Server error
 */
router.get('/', authenticationMiddleware, getCustomersHandler);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       '200':
 *         description: Customer data
 *       '404':
 *         description: Customer not found
 *       '500':
 *         description: Server error
 */
router.get('/:id', authenticationMiddleware, getCustomerByIdHandler);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               name: Updated new user
 *               email: newupdated@example.com
 *               phone: "987-654-3210"
 *     responses:
 *       '200':
 *         description: Updated customer data
 *       '404':
 *         description: Customer not found
 *       '500':
 *         description: Server error
 */
router.put('/:id', authenticationMiddleware, updateCustomerHandler);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       '204':
 *         description: Customer deleted successfully
 *       '404':
 *         description: Customer not found
 *       '500':
 *         description: Server error
 */
router.delete('/:id', authenticationMiddleware, authorizationMiddleware(Role.Admin), deleteCustomerHandler);

module.exports = router;
