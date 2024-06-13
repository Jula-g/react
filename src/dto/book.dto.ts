import { BookDetails } from '../book/Book';

export class BookResponseDto {
  bookId: number | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  yearPublished: number | undefined;
  availableCopies: number | undefined;
  bookDetails: BookDetails | undefined;
}

export class CreateBookDto {
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  yearPublished: number | undefined;
  availableCopies: number | undefined;
}
