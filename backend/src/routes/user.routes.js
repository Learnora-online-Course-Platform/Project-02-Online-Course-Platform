const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');

router.get('/me', auth, userCtrl.getMe);
router.put('/me', auth, userCtrl.updateMe);
router.post('/change-password', auth, userCtrl.changePassword);

// admin
router.get('/', auth, requireRole('admin'), userCtrl.listUsers);
router.delete('/:id', auth, requireRole('admin'), userCtrl.deleteUser);

module.exports = router;
