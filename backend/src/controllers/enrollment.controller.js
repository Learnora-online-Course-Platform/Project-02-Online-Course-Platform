const { Enrollment, Course } = require('../../models');

exports.enroll = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    
    const [enrollment, created] = await Enrollment.findOrCreate({
      where: { userId: req.user.id, courseId: req.params.courseId },
      defaults: { status: 'active' }
    });
    if (!created) return res.status(200).json({ message: 'Already enrolled', enrollment });
    res.status(201).json({ message: 'Enrolled', enrollment });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.unenroll = async (req, res) => {
  try {
    const result = await Enrollment.destroy({ where: { userId: req.user.id, courseId: req.params.courseId }});
    res.json({ message: result ? 'Unenrolled' : 'Not enrolled' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.listEnrolled = async (req, res) => {
  try {
    
    const where = req.user.role === 'admin' || req.user.role === 'instructor' ? {} : { userId: req.user.id };
    const enrollments = await Enrollment.findAll({ where });
    res.json(enrollments);
  } catch (err) { res.status(500).json({ error: err.message }); }
};
