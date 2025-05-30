import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token)
    return res.status(401).json({ message: 'Access denied, no token provided' });

  try {
    // Remove "Bearer " from token string
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'your-secret-key');
    req.user = decoded; // attach user payload
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
