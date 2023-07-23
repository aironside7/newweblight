const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

const secretKey = 'your_secret_key'; // Replace with your actual secret key

const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, roles: user.roles }, secretKey, {
    expiresIn: '1h', // Token will expire in 1 hour
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return '';
  }
};

module.exports = { generateToken, verifyToken };
