const Review = require("../models/Review");


exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.findAll({ where: { courseId } });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.createReview = async (req, res) => {
  try {
    const { rating, comment, userId, courseId } = req.body;
    const review = await Review.create({ rating, comment, userId, courseId });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.destroy();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
