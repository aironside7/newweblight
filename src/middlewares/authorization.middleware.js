const authorizationMiddleware = (requiredRole) => {
    return (req, res, next) => {
      const userRoles = req.user?.roles || [];
  
      if (!userRoles.includes(requiredRole)) {
        return res.status(403).json({ message: 'You are not authorized to access this resource.' });
      }
  
      next();
    };
  };
  
  module.exports = { authorizationMiddleware };
  