import React from 'react';
import LoanListItem from './LoanListItem';
import Loan from './Loan';
import './LoanList.css';
import List from '@mui/material/List';

interface LoanListProps {
  loans: Loan[];
}

const LoanList: React.FC<LoanListProps> = ({ loans }) => {
  return (
    <div className="Loan-list">
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
        {loans.map((loan) => (
          <LoanListItem key={loan.loanId} loan={loan} />
        ))}
      </List>
    </div>
  );
};

export default LoanList;
