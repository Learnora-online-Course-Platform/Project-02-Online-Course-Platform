const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password', 'passwordResetToken'] }});
  res.json(user);
};

exports.updateMe = async (req, res) => {
  const allowed = ['name', 'bio', 'profileImage'];
  const data = {};
  allowed.forEach(k => { if (req.body[k] !== undefined) data[k] = req.body[k]; });
  await User.update(data, { where: { id: req.user.id }});
  const updated = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] }});
  res.json(updated);
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);
  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) return res.status(401).json({ message: 'Bad current password' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: 'Password changed' });
};

// Admin-only
exports.listUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] }});
  res.json(users);
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id }});
  res.json({ message: 'Deleted' });
};
