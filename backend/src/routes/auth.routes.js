const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/register',
  [ body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }) ],
  authCtrl.register
);

router.post('/login', authCtrl.login);

router.post('/forgot-password', authCtrl.requestPasswordReset);
router.post('/reset-password/:token', authCtrl.resetPassword);
router.get('/verify-email/:token', authCtrl.verifyEmail);

router.post('/logout', authCtrl.logout);

module.exports = router;

