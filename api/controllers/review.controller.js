import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import User from "../models/user.model.js"; // make sure your User model is imported

// Create a new review
export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  try {
    // Check if review already exists
    const existingReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (existingReview)
      return next(
        createError(403, "You have already created a review for this gig!")
      );

    // TODO: check if user purchased the gig

    // Save new review
    const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });
    const savedReview = await newReview.save();

    // Update gig's totalStars and starNumber
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    // Populate user info for frontend
    const populatedReview = await Review.findById(savedReview._id).populate(
      "userId",
      "username img country"
    );

    res.status(201).send(populatedReview);
  } catch (err) {
    next(err);
  }
};

// Get all reviews for a gig
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id }).populate(
      "userId",
      "username img country"
    );
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

// Delete a review (optional)
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return next(createError(404, "Review not found"));

    if (review.userId.toString() !== req.userId)
      return next(createError(403, "You can only delete your own review"));

    await review.deleteOne();
    res.status(200).send({ message: "Review deleted" });
  } catch (err) {
    next(err);
  }
};
