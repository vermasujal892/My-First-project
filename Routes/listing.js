const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../Middleware.js");
const listingConstroller = require("../controllers/listing.js");
const { cloudinary, storage } = require("../cloudConfig.js");

const multer = require("multer");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingConstroller.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingConstroller.createRoute)
  );

// NEW Route
router.get("/new", isLoggedIn, wrapAsync(listingConstroller.newRoute));

router
  .route("/:id")
  .get(wrapAsync(listingConstroller.showRoute))
  .put(
    isLoggedIn,
    upload.single("listing[image]"),
    isOwner,
    wrapAsync(listingConstroller.updateRoute)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingConstroller.deleteRoute));

//Edit Route

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingConstroller.editRoute)
);

module.exports = router;
