import React from 'react';

const StarRating = ({ rating, maxStars = 5, interactive = false, onRatingChange }) => {
  const handleStarClick = (starValue) => {
    if (interactive && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  return (
    <div className="stars">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`star ${starValue <= rating ? '' : 'empty'} ${interactive ? 'interactive' : ''}`}
            onClick={() => handleStarClick(starValue)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;