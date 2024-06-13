import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import BookListItem from './BookListItem';
import Book from './Book';
import './BookList.css';
import MenuAppBar from '../app-bar/MenuAppBar';
import { useApi } from '../api/ApiProvider';
import Review from '../review/Review';
import ScrollDialog from '../review/ScrollDialog';
import { ClientResponse } from '../api/library-client';
import { GetReviewDto } from '../dto/review.dto';
import User from '../user/User';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const apiClient = useApi();

  const handleOpenDialog = (bookId: number) => {
    setSelectedBookId(bookId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReviews([]);
    setSelectedBookId(null);
  };

  useEffect(() => {
    if (selectedBookId) {
      apiClient
        .getReviews(selectedBookId)
        .then((response: ClientResponse<GetReviewDto[] | null>) => {
          if (response.success && response.data) {
            console.debug('Fetched reviews:', response.data);
            const fetchedReviews: Review[] = response.data.map((dto) => ({
              reviewId: dto.reviewId || 0,
              book: mapToBook(dto.book),
              rating: dto.rating || '',
              comment: dto.comment || '',
              reviewDate: dto.reviewDate
                ? new Date(dto.reviewDate)
                : new Date(),
              user: mapToUser(dto.user),
            }));
            setReviews(fetchedReviews);
          } else {
            setReviews([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
          setReviews([]);
        });
    }
  }, [selectedBookId, apiClient]);

  const mapToBook = (bookDto: GetReviewDto['book']): Book => {
    if (!bookDto) {
      return {
        bookId: 0,
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        yearPublished: 0,
        availableCopies: 0,
        bookDetails: { genre: '', summary: '', coverUrl: '' },
      };
    }

    return {
      bookId: bookDto.bookId || 0,
      title: bookDto.title || '',
      author: bookDto.author || '',
      isbn: bookDto.isbn || '',
      publisher: bookDto.publisher || '',
      yearPublished: bookDto.yearPublished || 0,
      availableCopies: bookDto.availableCopies || 0,
      bookDetails: {
        genre: bookDto.bookDetails?.genre || '',
        summary: bookDto.bookDetails?.summary || '',
        coverUrl: bookDto.bookDetails?.coverUrl || '',
      },
    };
  };

  const mapToUser = (userDto: GetReviewDto['user']): User => {
    if (!userDto) {
      return {
        userId: 0,
        name: '',
        lastName: '',
        email: '',
      };
    }

    return {
      userId: userDto.id || 0,
      name: userDto.name || '',
      lastName: userDto.lastName || '',
      email: userDto.email || '',
    };
  };

  return (
    <div>
      <MenuAppBar />
      <div className="Book-list">
        <h1>List of Books</h1>
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
          {books.map((book) => (
            <BookListItem
              key={book.bookId}
              book={book}
              onOpenDialog={handleOpenDialog}
            />
          ))}
        </List>
        <ScrollDialog
          open={openDialog}
          onClose={handleCloseDialog}
          reviews={reviews}
          bookId={selectedBookId}
        />
      </div>
    </div>
  );
};

export default BookList;
