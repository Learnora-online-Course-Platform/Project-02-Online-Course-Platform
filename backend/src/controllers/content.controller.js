const { models } = require('../config/index');

// COURSES
exports.getCourses = async (req, res) => {
  try {
    const courses = await models.Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await models.Course.findByPk(req.params.id, {
      include: [models.CourseMaterial, models.Quiz, models.Assignment]
    });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ENROLLMENT
exports.enrollCourse = async (req, res) => {
  try {
    // you may need an Enrollment model/table
    res.json({ message: `User ${req.user.id} enrolled in course ${req.params.id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MATERIALS
exports.getMaterials = async (req, res) => {
  try {
    const materials = await models.CourseMaterial.findAll({ where: { courseId: req.params.id } });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMaterial = async (req, res) => {
  try {
    const { type, title, url } = req.body;
    const material = await models.CourseMaterial.create({ type, title, url, courseId: req.params.id });
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// QUIZZES
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await models.Quiz.findAll({ where: { courseId: req.params.id } });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const quiz = await models.Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const { answer } = req.body;
    const correct = quiz.correctAnswer === answer;
    res.json({ correct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ASSIGNMENTS
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await models.Assignment.findAll({ where: { courseId: req.params.id } });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { fileUrl } = req.body;
    const submission = await models.Submission.create({
      fileUrl,
      assignmentId: req.params.id,
      studentId: req.user.id
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PROGRESS
exports.getProgress = async (req, res) => {
  try {
    const progress = await models.Progress.findOne({
      where: { userId: req.user.id, courseId: req.params.id }
    });
    res.json(progress || { percentComplete: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { percentComplete } = req.body;
    let progress = await models.Progress.findOne({
      where: { userId: req.user.id, courseId: req.params.id }
    });
    if (!progress) {
      progress = await models.Progress.create({ userId: req.user.id, courseId: req.params.id, percentComplete });
    } else {
      progress.percentComplete = percentComplete;
      await progress.save();
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
