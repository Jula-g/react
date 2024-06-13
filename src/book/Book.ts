export interface BookDetails {
  genre: string;
  summary: string;
  coverUrl: string;
}

interface Book {
  bookId: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  availableCopies: number;
  bookDetails: BookDetails;
}

export default Book;
