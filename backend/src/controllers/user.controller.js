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

// Admin: Add new user
exports.addUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, contactNumber, qualifications } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role.toLowerCase(), // convert "Student" -> "student"
      contactNumber,
      qualifications,
    });

    // 5️⃣ Send success response
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        contactNumber: newUser.contactNumber,
        qualifications: newUser.qualifications,
      },
    });
  } catch (error) {
    console.error("Add user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

