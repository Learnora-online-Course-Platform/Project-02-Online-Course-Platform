const Course = require("../models/Course");


exports.getCourses = async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
};


exports.createCourse = async (req, res) => {
  const { title, instructor, category, status } = req.body;
  const course = await Course.create({ title, instructor, category, status });
  res.status(201).json(course);
};


exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, instructor, category, status } = req.body;
  const course = await Course.findByPk(id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  course.title = title || course.title;
  course.instructor = instructor || course.instructor;
  course.category = category || course.category;
  course.status = status || course.status;
  await course.save();

  res.json(course);
};


exports.deleteCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByPk(id);
  if (!course) return res.status(404).json({ message: "Course not found" });

  await course.destroy();
  res.json({ message: "Course deleted" });
};
