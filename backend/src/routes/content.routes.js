const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Courses
router.get('/courses', contentController.getCourses);
router.get('/courses/:id', contentController.getCourseById);

// Enrollment
router.post('/courses/:id/enroll', authMiddleware, contentController.enrollCourse);

// Materials
router.get('/courses/:id/materials', contentController.getMaterials);
router.post('/courses/:id/materials', authMiddleware, contentController.addMaterial);

// Quizzes
router.get('/courses/:id/quizzes', contentController.getQuizzes);
router.post('/quizzes/:id/submit', authMiddleware, contentController.submitQuiz);

// Assignments
router.get('/courses/:id/assignments', contentController.getAssignments);
router.post('/assignments/:id/submit', authMiddleware, contentController.submitAssignment);

// Progress
router.get('/courses/:id/progress', authMiddleware, contentController.getProgress);
router.post('/courses/:id/progress', authMiddleware, contentController.updateProgress);

module.exports = router;
