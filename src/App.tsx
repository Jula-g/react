import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import { Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import Book from './book/Book';
import Loan from './loan/Loan';
import BookList from './book/BookList';
import LoanList from './loan/LoanList';
import ApiProvider from './api/ApiProvider';
import AddBookForm from './book/AddBookForm';
import AddLoanForm from './loan/AddLoanForm';
import AddReaderForm from './reader/AddReaderForm';

const mockBooks: Book[] = [
  {
    bookId: 1,
    isbn: '978-0-306-40615-7',
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    publisher: 'Pan Books',
    yearPublished: 1979,
    isAvailable: true,
  },
  {
    bookId: 2,
    isbn: '978-0-345-39180-3',
    title: '1984',
    author: 'George Orwell',
    publisher: 'Secker & Warburg',
    yearPublished: 1949,
    isAvailable: false,
  },
];

const mockLoans: Loan[] = [
  {
    loanId: 1,
    bookId: mockBooks[0].bookId,
    userId: 2,
    loanDate: new Date('2021-10-01'),
    returnDate: new Date('2021-10-15'),
  },
  {
    loanId: 2,
    bookId: mockBooks[1].bookId,
    userId: 4,
    loanDate: new Date('2024-04-22'),
    returnDate: null,
  },
];

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="*"
            element={<h1 style={{ alignContent: 'center' }}>404</h1>}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/add-book" element={<AddBookForm />} />
          <Route path="/add-loan" element={<AddLoanForm />} />
          <Route path="/add-reader" element={<AddReaderForm />} />
          <Route path="/home" element={<HomePage />}>
            <Route
              path="1"
              element={
                <>
                  <div
                    style={{
                      height: '300px',
                      width: '100%',
                    }}
                  >
                    <BookList books={mockBooks} />
                  </div>
                </>
              }
            />
            <Route
              path="2"
              element={
                <>
                  <div
                    style={{
                      height: '300px',
                      width: '100%',
                    }}
                  >
                    <LoanList loans={mockLoans} />
                  </div>
                </>
              }
            />
          </Route>
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
