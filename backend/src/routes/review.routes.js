const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");


router.get("/", reviewController.getReviews);


router.get("/course/:courseId", reviewController.getCourseReviews);


router.post("/", reviewController.createReview);


router.put("/:id", reviewController.updateReview);


router.delete("/:id", reviewController.deleteReview);

module.exports = router;
