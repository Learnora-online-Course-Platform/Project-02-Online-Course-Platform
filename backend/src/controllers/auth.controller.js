const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator'); // adjust if needed
const sendEmail = require('../utils/email');
const User = require('../models/User');
require('dotenv').config();

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
}

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'student' });

    // optional: create email verification token
    const emailToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = emailToken;
    await user.save();
    // send verification mail (example)
    // await sendEmail(email, 'Verify email', `Click: http://localhost:5000/api/auth/verify-email/${emailToken}`);

    const token = signToken(user);
    res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(200).json({ message: 'If that email exists you will receive a reset link' });

    const token = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = token;
    user.passwordResetExpires = new Date(Date.now() + 3600 * 1000); // 1 hour
    await user.save();

    // send email (implement sendEmail util)
    // await sendEmail(email, 'Reset password', `Reset link: http://localhost:5000/api/auth/reset-password/${token}`);

    res.json({ message: 'Reset email sent (dev: token in response)', token }); // remove token in real prod
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({ where: { passwordResetToken: token } });
    if (!user) return res.status(400).json({ message: 'Invalid token' });
    if (user.passwordResetExpires < new Date()) return res.status(400).json({ message: 'Token expired' });

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
