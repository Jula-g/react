import React from 'react';
import List from '@mui/material/List';
import BookListItem from './BookListItem';
import Book from './Book';
import './BookList.css';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [openBooks, setOpenBooks] = React.useState<{ [key: number]: boolean }>(
    {},
  );

  const handleClick = (bookId: number) => {
    setOpenBooks((prevOpenBooks) => ({
      ...prevOpenBooks,
      [bookId]: !prevOpenBooks[bookId],
    }));
  };

  return (
    <div className="Book-list">
      <h1>List of Books</h1>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
      >
        {books.map((book) => (
          <BookListItem
            key={book.bookId}
            book={book}
            open={openBooks[book.bookId]}
            onClick={() => handleClick(book.bookId)}
          />
        ))}
      </List>
    </div>
  );
};

export default BookList;
