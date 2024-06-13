import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Book from './Book';
import { useApi } from '../api/ApiProvider';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300,
  margin: theme.spacing(2),
  flexShrink: 0,
}));

interface BookListItemProps {
  book: Book;
  onOpenDialog: (bookId: number) => void;
}

const BookListItem: React.FC<BookListItemProps> = ({ book, onOpenDialog }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [updatedBook, setUpdatedBook] = React.useState({ ...book });
  const apiClient = useApi();

  const handleDetailsClick = () => {
    setExpanded(!expanded);
  };

  const handleBorrowClick = () => {
    const loanData = {
      bookId: book.bookId,
    };

    apiClient.createLoan(loanData).then((response) => {
      if (response.success) {
        alert('Loan added successfully');
      } else {
        alert(
          'You already have this book borrowed or you have too many books borrowed.',
        );
      }
    });
  };

  const handleUpdateClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedBook({ ...book });
  };

  const handleSaveClick = () => {
    const { isbn, title, author, publisher, availableCopies, bookDetails } =
      updatedBook;
    const { genre, summary, coverUrl } = bookDetails || {};

    const updatedBookDto = {
      isbn,
      title,
      author,
      publisher,
      yearPublished: updatedBook.yearPublished,
      availableCopies,
      bookDetails: {
        genre,
        summary,
        coverUrl,
      },
    };

    apiClient.updateBook(updatedBookDto, book.bookId).then((response) => {
      if (response.success) {
        alert('Book updated successfully');
        setEditMode(false);
      } else {
        alert('Error updating book');
      }
    });
  };

  const isAdmin = apiClient.getUserRole() === 'ROLE_ADMIN';
  const isAvailable = book.availableCopies > 0;

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        src={book.bookDetails?.coverUrl}
        alt={book.title}
      />
      <CardContent>
        {editMode ? (
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              label="ISBN"
              variant="outlined"
              size="small"
              value={updatedBook.isbn}
              onChange={(e) =>
                setUpdatedBook({ ...updatedBook, isbn: e.target.value })
              }
            />
            <TextField
              label="Title"
              variant="outlined"
              size="small"
              value={updatedBook.title}
              onChange={(e) =>
                setUpdatedBook({ ...updatedBook, title: e.target.value })
              }
            />
            <TextField
              label="Author"
              variant="outlined"
              size="small"
              value={updatedBook.author}
              onChange={(e) =>
                setUpdatedBook({ ...updatedBook, author: e.target.value })
              }
            />
            <TextField
              label="Publisher"
              variant="outlined"
              size="small"
              value={updatedBook.publisher}
              onChange={(e) =>
                setUpdatedBook({ ...updatedBook, publisher: e.target.value })
              }
            />
            <TextField
              label="Year Published"
              variant="outlined"
              size="small"
              type="number"
              value={updatedBook.yearPublished}
              onChange={(e) =>
                setUpdatedBook({
                  ...updatedBook,
                  yearPublished: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Available Copies"
              variant="outlined"
              size="small"
              type="number"
              value={updatedBook.availableCopies}
              onChange={(e) =>
                setUpdatedBook({
                  ...updatedBook,
                  availableCopies: parseInt(e.target.value),
                })
              }
            />
            <TextField
              label="Genre"
              variant="outlined"
              size="small"
              value={updatedBook.bookDetails?.genre}
              onChange={(e) =>
                setUpdatedBook({
                  ...updatedBook,
                  bookDetails: {
                    ...updatedBook.bookDetails,
                    genre: e.target.value,
                  },
                })
              }
            />
            <TextField
              label="Summary"
              variant="outlined"
              size="small"
              value={updatedBook.bookDetails?.summary}
              onChange={(e) =>
                setUpdatedBook({
                  ...updatedBook,
                  bookDetails: {
                    ...updatedBook.bookDetails,
                    summary: e.target.value,
                  },
                })
              }
            />
          </Box>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author: {book.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Publisher: {book.publisher}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Year Published: {book.yearPublished}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Available: {isAvailable ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ISBN: {book.isbn}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {editMode ? (
          <>
            <Button size="small" color="primary" onClick={handleSaveClick}>
              Save
            </Button>
            <Button size="small" color="secondary" onClick={handleCancelClick}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={handleUpdateClick}
            style={{ display: isAdmin ? '' : 'none' }}
          >
            Update
          </Button>
        )}
        <Button
          size="small"
          disabled={!isAvailable}
          style={{ display: isAdmin ? 'none' : '' }}
          onClick={handleBorrowClick}
        >
          Borrow
        </Button>
        <Button
          size="small"
          style={{ display: isAdmin ? 'none' : '' }}
          onClick={handleDetailsClick}
        >
          Details
        </Button>
        <Button
          size="small"
          style={{ display: isAdmin ? 'none' : '' }}
          onClick={() => onOpenDialog(book.bookId)}
        >
          Reviews
        </Button>
        <Button
          size="small"
          style={{ display: isAdmin && !editMode ? '' : 'none' }}
          onClick={() => {
            apiClient.deleteBook(book.bookId).then((response) => {
              if (response.success) {
                alert('Book deleted successfully');
              } else {
                alert('Error deleting book');
              }
            });
          }}
        >
          Delete
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Genre: {book.bookDetails?.genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Summary: {book.bookDetails?.summary}
          </Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

export default BookListItem;
