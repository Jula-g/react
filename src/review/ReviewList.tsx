import ReviewListItem from './ReviewListItem';
import Review from './Review';
import List from '@mui/material/List';
import React from 'react';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="Review-list">
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '16px',
          padding: '16px',
        }}
        component="nav"
      >
        {reviews.map((review) => (
          <ReviewListItem key={review.reviewId} review={review} />
        ))}
      </List>
    </div>
  );
};

export default ReviewList;
