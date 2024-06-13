import React from 'react';
import Loan from './Loan';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useApi } from '../api/ApiProvider';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  flexShrink: 0,
}));

interface LoanListItemProps {
  loan: Loan;
}

const LoanListItem: React.FC<LoanListItemProps> = ({ loan }) => {
  const apiClient = useApi();

  const handleReturnClick = () => {
    const loanData = {
      loanId: loan.loanId,
      bookId: loan.book.bookId,
    };

    apiClient
      .updateLoan(loanData)
      .then((response) => {
        if (response.success) {
          alert('Loan returned successfully');
        }
      })
      .catch((error) => {
        alert('Error returning loan');
        console.error('Error returning loan:', error);
      });
  };

  const isReturned = loan.returnDate !== null;

  return (
    <>
      <StyledCard>
        <CardMedia
          component="img"
          height="140"
          image={loan.book.bookDetails.coverUrl}
          alt={loan.book.title}
        />
        <CardContent style={{ fontSize: 'medium' }}>
          <Typography gutterBottom variant="h5" component="div">
            Book: {loan.book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User: {loan.user.name} {loan.user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {loan.user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Loan Date: {loan.loanDate.toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Due Date: {loan.dueDate.toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Return Date:{' '}
            {loan.returnDate
              ? loan.returnDate.toLocaleDateString()
              : 'Not returned yet'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            disabled={isReturned}
            onClick={handleReturnClick}
          >
            Return this book
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
};

export default LoanListItem;
