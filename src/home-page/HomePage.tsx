import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import MenuAppBar from '../app-bar/MenuAppBar';
import LoanList from '../loan/LoanList';
import { useApi } from '../api/ApiProvider';
import Loan from '../loan/Loan';

function HomePage() {
  const apiClient = useApi();
  const [loans, setLoans] = React.useState<Loan[]>([]);

  React.useEffect(() => {
    apiClient
      .getLoans()
      .then((response) => {
        if (response.success && response.data) {
          if (Array.isArray(response.data)) {
            const mappedLoans = response.data.map((loanDto) => ({
              loanId: loanDto.loanId,
              book: loanDto.book,
              user: loanDto.user,
              loanDate: new Date(loanDto.loanDate),
              dueDate: new Date(loanDto.dueDate),
              returnDate: loanDto.returnDate
                ? new Date(loanDto.returnDate)
                : null,
            }));
            setLoans(mappedLoans);
          } else {
            console.error('Invalid response data format: not an array');
          }
        } else {
          console.error('Failed to fetch loans');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch loans:', error);
      });
  }, [apiClient]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <h1
        style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '120px' }}
      >
        Library Management System
      </h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <h2 style={{ textAlign: 'center', fontStyle: 'italic' }}>
          List of Your Loans
        </h2>
        <LoanList loans={loans} />
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
