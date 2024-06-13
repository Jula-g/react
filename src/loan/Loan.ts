import Book from '../book/Book';
import User from '../user/User';

interface Loan {
  loanId: number;
  book: Book;
  user: User;
  loanDate: Date;
  dueDate: Date;
  returnDate: Date | null;
}

export default Loan;
