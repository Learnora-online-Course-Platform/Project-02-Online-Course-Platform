const jwt = require('jsonwebtoken');
const User = require('../models/User'); // adjust to your models index path
require('dotenv').config();

module.exports = async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // optional: load full user
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token user' });
    req.user = { id: user.id, role: user.role, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid', error: err.message });
  }
};
