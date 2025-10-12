const express = require('express');
const router = express.Router();
const progressCtrl = require('../controllers/progress.controller');
const auth = require('../middleware/auth.middleware');

router.post('/mark-complete', auth, progressCtrl.markCompleted);
router.get('/:courseId', auth, progressCtrl.getProgress);

module.exports = router;
