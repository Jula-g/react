import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuAppBar from '../app-bar/MenuAppBar';
import Book from './Book';
import './BookList.css';
import { useApi } from '../api/ApiProvider';
import BookList from './BookList';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const BookPage: React.FC = () => {
  const apiClient = useApi();
  const [books, setBooks] = React.useState<Book[]>([]);
  const query = useQuery();
  const searchQuery = query.get('title');

  React.useEffect(() => {
    if (searchQuery) {
      apiClient
        .getBookByTitle(searchQuery)
        .then((response) => {
          if (response.success && response.data) {
            const bookDto = response.data;
            const book = {
              bookId: bookDto.bookId || 0,
              isbn: bookDto.isbn || '',
              title: bookDto.title || '',
              author: bookDto.author || '',
              publisher: bookDto.publisher || '',
              yearPublished: bookDto.yearPublished || 0,
              availableCopies: bookDto.availableCopies || 0,
              bookDetails: bookDto.bookDetails || {
                genre: '',
                summary: '',
                coverUrl: '',
              },
            };
            setBooks([book]);
          } else {
            console.error('Failed to fetch book by title');
          }
        })
        .catch((error) => {
          console.error('Failed to fetch book by title:', error);
        });
    } else {
      apiClient
        .getBooks()
        .then((response) => {
          if (response.success && response.data) {
            if (Array.isArray(response.data)) {
              const mappedBooks = response.data.map((bookDto) => ({
                bookId: parseInt(bookDto.bookId || '0'),
                isbn: bookDto.isbn || '',
                title: bookDto.title || '',
                author: bookDto.author || '',
                publisher: bookDto.publisher || '',
                yearPublished: parseInt(bookDto.yearPublished || '0'),
                availableCopies: parseInt(bookDto.availableCopies || '0'),
                bookDetails: bookDto.bookDetails || {
                  genre: '',
                  summary: '',
                  coverUrl: '',
                },
              }));
              setBooks(mappedBooks);
            } else {
              console.error('Invalid response data format: not an array');
            }
          } else {
            console.error('Failed to fetch books');
          }
        })
        .catch((error) => {
          console.error('Failed to fetch books:', error);
        });
    }
  }, [apiClient, searchQuery]);

  return (
    <div>
      <MenuAppBar />
      <BookList books={books} />
    </div>
  );
};

export default BookPage;
