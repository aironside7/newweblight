const { verifyToken } = require('../utils/jwt.utils');

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
   // Attach the decoded user data to the request object
  req.user = decodedToken; 
  next();
};

module.exports = { authenticationMiddleware };
