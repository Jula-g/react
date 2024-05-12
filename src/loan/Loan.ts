interface Loan {
  loanId: number;
  bookId: number;
  userId: number;
  loanDate: Date;
  returnDate: Date | null;
}

export default Loan;
