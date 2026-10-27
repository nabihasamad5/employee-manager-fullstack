const jwt = require('jsonwebtoken');

// Auth guard: verifies the JWT token on protected routes
module.exports = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
  if (!token) return res.status(401).json({ message: 'No token provided, please log in' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // identifies which user is making the request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
