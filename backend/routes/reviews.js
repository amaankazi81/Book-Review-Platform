const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Get reviews for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate('reviewer', 'username')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create review
router.post('/', auth, [
  body('book').notEmpty().withMessage('Book ID is required'),
  body('reviewText').isLength({ min: 10 }).withMessage('Review must be at least 10 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { book, reviewText, rating } = req.body;

    // Check if book exists
    const bookExists = await Book.findById(book);
    if (!bookExists) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      book,
      reviewer: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    // Create review
    const review = new Review({
      book,
      reviewer: req.user._id,
      reviewText,
      rating
    });

    await review.save();
    await review.populate('reviewer', 'username');

    // Update book's average rating
    await updateBookRating(book);

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update books average rating
async function updateBookRating(bookId) {
  const reviews = await Review.find({ book: bookId });
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;

  await Book.findByIdAndUpdate(bookId, {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews
  });
}

module.exports = router;