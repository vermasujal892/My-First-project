const Review  = require("../models/review");
const Listing = require("../models/listing.js"); 
const ExpressError   = require("../utils/ExpressError.js");


module.exports.addReview  = async (req, res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id).populate("reviews");
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id; 

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new Review saved");
    req.flash("success", "New Review Created !");
    res.redirect(`/listings/${listing._id}`);
  };

  module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Succesfully !");
    res.redirect(`/listings/${id}`);
  };