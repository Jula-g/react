import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import { Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import ApiProvider from './api/ApiProvider';
import AddBookForm from './admin/AddBookForm';
import RegisterForm from './register-form/RegisterForm';
import BookPage from './book/BookPage';
import LoanHistoryForm from './loan/LoanHistoryForm';
import ManageAccountsForm from './admin/ManageAccountsForm';

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="*"
            element={<h1 style={{ justifyContent: 'center' }}>404</h1>}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/add-book" element={<AddBookForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/history" element={<LoanHistoryForm />} />
          <Route path="/accounts" element={<ManageAccountsForm />} />
        </Routes>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
