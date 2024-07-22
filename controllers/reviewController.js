const { Review, Users, Restroom, Comment } = require('../models');
const { getOrCreateRestroom } = require('../utils/getOrCreateRestroom');
require('dotenv').config(); // Ensure dotenv is properly configured

// Helper function to check if a review already exists
const checkExistingReview = async (restroomId, userId) => {
  return await Review.findOne({
    where: {
      restroom_id: restroomId,
      user_id: userId
    }
  });
};

// Helper function to create a new review
const createNewReview = async (restroomId, userId, rating, customerOnlyUse, comment) => {
  return await Review.create({
    restroom_id: restroomId,
    user_id: userId,
    cleanliness: rating.cleanliness,
    accessibility: rating.accessibility,
    privacy_security: rating.privacy_security,
    convenience: rating.convenience,
    customer_only_use: customerOnlyUse,
    content: comment,
  });
};

// Function to render the review response
const renderReviewResponse = (res, restroom, reviews, user, userHasReviewed, poopEmojis, googleMapsAPIKey) => {
  res.render('reviews/review', { 
    searchResult: restroom, 
    reviews, 
    user, 
    userHasReviewed, 
    poopEmojis, 
    googleMapsAPIKey 
  });
};

// Function to calculate the average rating
const calculateAverageRating = (reviews) => {
  const total = reviews.reduce((acc, review) => 
    acc + (review.cleanliness + review.accessibility + review.privacy_security + review.convenience) / 4, 0
  );
  return total / reviews.length;
};

// Function to convert a rating to poop emojis
const convertToPoopEmojis = (rating) => {
  return '💩'.repeat(Math.round(rating));
};

// Get reviews and restroom info by ID
exports.getReviewsAndInfoById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch restroom and reviews
    const restroom = await fetchRestroomById(id);
    if (!restroom) {
      return res.status(404).json({ message: 'Restroom not found' });
    }

    const reviews = await fetchReviewsByRestroomId(id);
    const userHasReviewed = determineIfUserHasReviewed(reviews, req.user);

    // Calculate average rating and convert to poop emojis
    const averageRating = calculateAverageRating(reviews);
    const poopEmojis = convertToPoopEmojis(averageRating);

    // Fetch comments for each review and convert ratings to poop emojis
    for (let review of reviews) {
      review.comments = await fetchCommentsByReviewId(review.id);
      review.cleanliness = convertToPoopEmojis(review.cleanliness);
      review.accessibility = convertToPoopEmojis(review.accessibility);
      review.privacy_security = convertToPoopEmojis(review.privacy_security);
      review.convenience = convertToPoopEmojis(review.convenience);
    }

    // Get the Google Maps API key from environment variables
    const googleMapsAPIKey = process.env.GOOGLE_PLACES_API_KEY;

    // Render the review page with all necessary data
    return renderReviewResponse(res, restroom, reviews, req.user, userHasReviewed, poopEmojis, googleMapsAPIKey);
  } catch (error) {
    console.error('Error fetching reviews:', error.message, error.stack);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch restroom details by ID
const fetchRestroomById = async (id) => {
  return await Restroom.findByPk(id);
};

// Fetch reviews by restroom ID
const fetchReviewsByRestroomId = async (restroomId) => {
  return await Review.findAll({
    where: { restroom_id: restroomId },
    include: [{ model: Users, attributes: ['username'] }]
  });
};

// Fetch comments by review ID
const fetchCommentsByReviewId = async (reviewId) => {
  return await Comment.findAll({
    where: { review_id: reviewId },
    include: [{ model: Users, attributes: ['username'] }]
  });
};

// Determine if the user has reviewed a particular restroom
const determineIfUserHasReviewed = (reviews, user) => {
  if (user) {
    return reviews.some(review => review.user_id === user.id);
  }
  return false;
};

// Create a new review
exports.createReview = async (req, res) => {
  console.log('req.body:', req.body);
  try {
    const { placeId, rating, comment } = req.body;
    const userId = req.user.id;
    const customerOnlyUse = req.body.rating.customer_only_use === 'on';

    const restroom = await getOrCreateRestroom(placeId);

    const existingReview = await checkExistingReview(restroom.id, userId);
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this restroom.' });
    }

    const newReview = await createNewReview(restroom.id, userId, rating, customerOnlyUse, comment);
    return res.redirect(`/reviews/${restroom.id}`);
  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await findReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (!isUserAuthorizedToDelete(review, req.user)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await deleteReviewById(reviewId);
    return res.redirect('back'); // Redirect to the previous page
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to find a review by ID
const findReviewById = async (reviewId) => {
  return await Review.findByPk(reviewId);
};

// Helper function to check if the user is authorized to delete the review
const isUserAuthorizedToDelete = (review, user) => {
  return review.user_id === user.id;
};

// Helper function to delete a review by ID
const deleteReviewById = async (reviewId) => {
  const review = await Review.findByPk(reviewId);
  return await review.destroy();
};
