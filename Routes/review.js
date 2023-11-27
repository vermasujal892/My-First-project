const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../Middleware.js");
const reviewController = require("../controllers/review.js");

// Add review

router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.addReview));

//Delete Review

router.delete("/:reviewId", isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
