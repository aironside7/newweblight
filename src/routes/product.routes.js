const { Router } = require('express');
const { authenticationMiddleware } = require('../middlewares/authentication.middleware');
const { authorizationMiddleware } = require('../middlewares/authorization.middleware');
const { Role } = require('../models/user.model');
const {
  createProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
} = require('../controllers/product.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *             example:
 *               name: Product 1
 *               price: 19.99
 *               description: A wonderful product
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
router.post('/', authenticationMiddleware, authorizationMiddleware(Role.Admin), createProductHandler);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of products
 *       '500':
 *         description: Server error
 */
router.get('/', authenticationMiddleware, getProductsHandler);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       '200':
 *         description: Product data
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */
router.get('/:id', authenticationMiddleware, getProductByIdHandler);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *             example:
 *               name: Updated Product 1
 *               price: 24.99
 *               description: An amazing product
 *     responses:
 *       '200':
 *         description: Updated product data
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */
router.put('/:id', authenticationMiddleware, updateProductHandler);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Server error
 */
router.delete('/:id', authenticationMiddleware, authorizationMiddleware(Role.Admin), deleteProductHandler);

module.exports = router;
