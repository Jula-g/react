import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ReviewList from './ReviewList';
import Review from './Review';
import { useApi } from '../api/ApiProvider';

interface ScrollDialogProps {
  open: boolean;
  onClose: () => void;
  reviews: Review[];
  bookId: number | null;
}

const ScrollDialog: React.FC<ScrollDialogProps> = ({
  open,
  onClose,
  reviews,
  bookId,
}) => {
  const [scroll] = useState<DialogProps['scroll']>('paper');
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });
  const apiClient = useApi();

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleAdd = () => {
    setIsAddingReview(true);
  };

  const handleSave = () => {
    if (bookId !== null) {
      const requestBody = {
        userId: apiClient.getUserId(),
        rating: newReview.rating,
        comment: newReview.comment,
      };

      apiClient.createReview(bookId, requestBody).then((response) => {
        if (response.success) {
          alert('Review added successfully');
          setIsAddingReview(false);
          setNewReview({ rating: '', comment: '' });
          onClose();
        } else {
          alert('You already have a review for this book.');
        }
      });
    }
  };

  const handleNewReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setIsAddingReview(false);
    setNewReview({ rating: '', comment: '' });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Reviews</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <ReviewList reviews={reviews} />
        </DialogContentText>
        {isAddingReview && (
          <div>
            <TextField
              label="Rating"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              name="rating"
              value={newReview.rating}
              onChange={handleNewReviewChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Comment"
              type="text"
              name="comment"
              value={newReview.comment}
              onChange={handleNewReviewChange}
              fullWidth
              margin="normal"
            />
            <DialogActions>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
              <Button onClick={handleCancel} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </div>
        )}
      </DialogContent>
      {!isAddingReview && (
        <DialogActions>
          <Button onClick={handleAdd}>Add review</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ScrollDialog;
