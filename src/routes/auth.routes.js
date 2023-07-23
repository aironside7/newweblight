const { Router } = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: Ani roy
 *               email: ani@example.com
 *               password: password123
 *               roles: ["admin/user"]
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in as a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: Ani roy
 *               password: password123
 *     responses:
 *       '200':
 *         description: User logged in successfully with the access token
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Server error
 */
router.post('/login', login);

module.exports = router;
