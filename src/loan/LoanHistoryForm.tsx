import React from 'react';
import { useApi } from '../api/ApiProvider';
import LoanList from './LoanList';
import Loan from './Loan';
import MenuAppBar from '../app-bar/MenuAppBar';
import Box from '@mui/material/Box';

function LoanHistoryForm() {
  const apiClient = useApi();
  const [loans, setLoans] = React.useState<Loan[]>([]);

  React.useEffect(() => {
    apiClient
      .getLoans()
      .then((response) => {
        if (response.success && response.data) {
          if (Array.isArray(response.data)) {
            let mappedLoans = response.data.map((loanDto) => ({
              loanId: loanDto.loanId,
              book: loanDto.book,
              user: loanDto.user,
              loanDate: new Date(loanDto.loanDate),
              dueDate: new Date(loanDto.dueDate),
              returnDate: loanDto.returnDate
                ? new Date(loanDto.returnDate)
                : null,
            }));
            mappedLoans = mappedLoans.filter(
              (loan) => loan.returnDate !== null,
            );

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
    <div>
      <MenuAppBar />
      <Box>
        <h1 style={{ textAlign: 'center', marginTop: '120px' }}>
          Your Loan History
        </h1>
      </Box>

      <LoanList loans={loans} />
    </div>
  );
}

export default LoanHistoryForm;
