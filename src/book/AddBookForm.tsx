import React, { useState } from 'react';
import { LibraryClient } from '../api/library-client';
import { CreateBookResponseDto } from '../dto/book.dto';

const AddBookForm: React.FC = () => {
  const [book, setBook] = useState<CreateBookResponseDto>({
    bookId: '',
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    yearPublished: '',
    availableCopies: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = new LibraryClient();
    const response = await client.createBook(book);
    if (response.success) {
      alert('Book added successfully');
    } else {
      alert('Error adding book');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="isbn"
        value={book.isbn}
        onChange={handleChange}
        placeholder="ISBN"
        required
      />
      <input
        type="text"
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        type="text"
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <input
        type="text"
        name="publisher"
        value={book.publisher}
        onChange={handleChange}
        placeholder="Publisher"
        required
      />
      <input
        type="text"
        name="yearPublished"
        value={book.yearPublished}
        onChange={handleChange}
        placeholder="Year Published"
        required
      />
      <input
        type="number"
        name="availableCopies"
        value={book.availableCopies}
        onChange={handleChange}
        placeholder="Available Copies"
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
