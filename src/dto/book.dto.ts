export class BookResponseDto {
  bookId: string | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  yearPublished: string | undefined;
  isAvailable: boolean | undefined;
}

export class CreateBookResponseDto {
  bookId: string | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  yearPublished: string | undefined;
  availableCopies: number | undefined;
}
