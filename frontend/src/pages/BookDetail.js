import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';

const BookDetail = ({ user }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    reviewText: '',
    rating: 5
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
      setError('Book not found');
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/reviews/book/${id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (rating) => {
    setReviewForm({
      ...reviewForm,
      rating
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/reviews', {
        book: id,
        ...reviewForm
      });
      
      setReviews([response.data, ...reviews]);
      setReviewForm({ reviewText: '', rating: 5 });
      setSuccess('Review added successfully!');
      
      // Refresh book data to update average rating
      fetchBook();
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding review');
    } finally {
      setSubmitLoading(false);
    }
  };

  const hasUserReviewed = reviews.some(review => review.reviewer._id === user?.id);

  if (loading) {
    return <div className="loading">Loading book details...</div>;
  }

  if (!book) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Book not found</h2>
        <Link to="/" className="btn btn-primary">Back to Books</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
        ← Back to Books
      </Link>
      
      <div className="card">
        <h1 className="card-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          {book.title}
        </h1>
        
        <div className="card-meta" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          by <strong>{book.author}</strong> • Genre: <strong>{book.genre}</strong>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <StarRating rating={book.averageRating} />
          <span style={{ fontSize: '1.1rem' }}>
            {book.averageRating > 0 ? book.averageRating.toFixed(1) : 'No ratings'} 
            ({book.totalReviews} reviews)
          </span>
        </div>
        
        <div className="card-meta">
          Added by {book.addedBy?.username} on {new Date(book.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Review Form */}
      {user && !hasUserReviewed && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3>Write a Review</h3>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label>Your Rating</label>
              <StarRating
                rating={reviewForm.rating}
                interactive={true}
                onRatingChange={handleRatingChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="reviewText">Your Review *</label>
              <textarea
                id="reviewText"
                name="reviewText"
                value={reviewForm.reviewText}
                onChange={handleReviewChange}
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                placeholder="Write your review here (minimum 10 characters)..."
              />
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={submitLoading}>
              {submitLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      {/* Login prompt */}
      {!user && (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p>
            <Link to="/login" className="btn btn-primary">Login</Link> to write a review
          </p>
        </div>
      )}

      {/* User already reviewed */}
      {user && hasUserReviewed && (
        <div className="card" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#718096' }}>You have already reviewed this book.</p>
        </div>
      )}

      {/* Reviews */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3>Reviews ({reviews.length})</h3>
        
        {reviews.length === 0 ? (
          <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>
            No reviews yet. Be the first to review this book!
          </p>
        ) : (
          <div>
            {reviews.map(review => (
              <div key={review._id} className="review">
                <div className="review-header">
                  <span className="review-author">{review.reviewer.username}</span>
                  <span className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="review-rating">
                  <StarRating rating={review.rating} />
                </div>
                <div className="review-text">{review.reviewText}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;