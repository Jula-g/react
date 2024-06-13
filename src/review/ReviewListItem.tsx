import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useApi } from '../api/ApiProvider';
import Review from './Review';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  flexShrink: 0,
}));

interface ReviewListItemProps {
  review: Review;
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({ review }) => {
  const apiClient = useApi();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedReview, setUpdatedReview] = useState({
    rating: review.rating,
    comment: review.comment,
  });

  const ifReviewIsMine = () => {
    return review.user.userId === apiClient.getUserId();
  };

  const handleUpdate = () => {
    apiClient.updateReview(review.reviewId, updatedReview).then((response) => {
      if (response.success) {
        alert('Review updated successfully');
        setIsEditing(false);
      } else {
        alert('Failed to update review');
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUpdatedReview({
      rating: review.rating,
      comment: review.comment,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);

    setUpdatedReview({
      rating: review.rating,
      comment: review.comment,
    });
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedReview({
      ...updatedReview,
      rating: String(event.target.value),
    });
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedReview({
      ...updatedReview,
      comment: event.target.value,
    });
  };

  return (
    <StyledCard>
      <CardContent style={{ fontSize: 'medium' }}>
        <Typography gutterBottom variant="h5" component="div">
          Rating: {review.rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comment: {review.comment}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Uploaded by {review.user.name} {review.user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review Date: {review.reviewDate.toLocaleDateString()}
        </Typography>
        {isEditing && (
          <>
            <label>
              Rating:
              <input
                type="number"
                value={updatedReview.rating}
                onChange={handleRatingChange}
                aria-valuemin={1}
                aria-valuemax={5}
              />
            </label>
            <br />
            <label>
              Comment:
              <input
                type="text"
                value={updatedReview.comment}
                onChange={handleCommentChange}
              />
            </label>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <>
            <Button size="small" onClick={handleUpdate}>
              Save changes
            </Button>
            <Button size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            size="small"
            style={{ display: ifReviewIsMine() ? '' : 'none' }}
            onClick={handleEdit}
          >
            Update your review
          </Button>
        )}
        <Button
          size="small"
          style={{ display: ifReviewIsMine() ? '' : 'none' }}
          onClick={() => {
            apiClient.deleteReview(review.reviewId).then((response) => {
              if (response.success) {
                alert('Review deleted successfully');
              } else {
                alert('Failed to delete review');
              }
            });
          }}
        >
          Delete your review
        </Button>
      </CardActions>
    </StyledCard>
  );
};
export default ReviewListItem;
