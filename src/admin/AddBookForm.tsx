import './AddBookForm.css';
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { CreateBookDto } from '../dto/book.dto';
import { useApi } from '../api/ApiProvider';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from '../app-bar/MenuAppBar';
import Box from '@mui/material/Box';

const AddBookForm: React.FC = () => {
  const [book, setBook] = useState<CreateBookDto>({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    yearPublished: 0,
    availableCopies: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const apiClient = useApi();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiClient.createBook(book).then((response) => {
      if (response.success) {
        alert('Book added successfully');
      } else {
        alert('Error adding book');
      }
    });
  };

  return (
    <>
      <MenuAppBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box marginBottom={2} alignItems="center">
          <h1 style={{ marginRight: 10 }}>Fill in the data to add book</h1>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={500}
            marginLeft={10}
            padding={2}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} style={{ alignContent: 'center' }}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="ISBN"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Title"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Author"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Publisher"
                    name="publisher"
                    value={book.publisher}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Year Published"
                    name="yearPublished"
                    value={book.yearPublished}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    label="Available Copies"
                    name="availableCopies"
                    value={book.availableCopies}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: 'purple' }}
                    onClick={() => navigate('/home')}
                  >
                    Add Book
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddBookForm;
