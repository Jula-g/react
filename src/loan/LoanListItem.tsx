import React from 'react';
import Loan from './Loan';
import ListItem from '@mui/material/ListItem';

interface LoanListItemProps {
  loan: Loan;
}

const LoanListItem: React.FC<LoanListItemProps> = ({ loan }) => {
  return (
    <>
      <ListItem sx={{ fontWeight: 'bold' }}>Loan ID: {loan.loanId}</ListItem>
      <ListItem sx={{ pl: 4 }}>Book ID: {loan.bookId}</ListItem>
      <ListItem sx={{ pl: 4 }}>User ID: {loan.userId}</ListItem>
      <ListItem sx={{ pl: 4 }}>
        Loan Date: {loan.loanDate.toLocaleDateString()}
      </ListItem>
      <ListItem sx={{ pl: 4 }} style={{ marginBottom: 50 }}>
        Return Date:{' '}
        {loan.returnDate
          ? loan.returnDate.toLocaleDateString()
          : 'Not returned yet'}
      </ListItem>
    </>
  );
};

export default LoanListItem;
