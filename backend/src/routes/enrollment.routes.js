const express = require('express');
const router = express.Router();
const enrollCtrl = require('../controllers/enrollment.controller');
const auth = require('../middleware/auth.middleware');

router.post('/:courseId/enroll', auth, enrollCtrl.enroll);
router.delete('/:courseId/enroll', auth, enrollCtrl.unenroll);
router.get('/my', auth, enrollCtrl.listEnrolled);

module.exports = router;
