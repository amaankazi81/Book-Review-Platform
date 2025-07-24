const express = require('express');
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

// Geting all books with filters and pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, author, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (genre) filter.genre = new RegExp(genre, 'i');
    if (author) filter.author = new RegExp(author, 'i');

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const books = await Book.find(filter)
      .populate('addedBy', 'username')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Book.countDocuments(filter);

    res.json({
      books,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalBooks: total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'username');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Creating book
router.post('/', auth, [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, genre } = req.body;

    const book = new Book({
      title,
      author,
      genre,
      addedBy: req.user._id
    });

    await book.save();
    await book.populate('addedBy', 'username');

    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get unique genres
router.get('/meta/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get unique authors
router.get('/meta/authors', async (req, res) => {
  try {
    const authors = await Book.distinct('author');
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;