import React from 'react';
import GeneralList from '../list/GeneralList';
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
      <h1>List of Loans</h1>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
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
