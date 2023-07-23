const { registerUser, loginUser } = require('../services/auth.service');

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
 *               username: user1
 *               email: user1@example.com
 *               password: password123
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Server error
 */
const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and obtain an access token
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
 *               username: user1
 *               password: password123
 *     responses:
 *       '200':
 *         description: Access token obtained successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Server error
 */
const login = async (req, res, next) => {
  try {
    const token = await loginUser(req.body);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
