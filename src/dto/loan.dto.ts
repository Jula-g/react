import { GetUserDto } from './user.dto';
import { BookResponseDto } from './book.dto';

export class CreateLoanResponseDto {
  dueDate: Date | undefined;
  userId: number | undefined;
  bookId: number | undefined;
}

export class GetLoanResponseDto {
  loanId: number | undefined;
  loanDate: Date | undefined;
  dueDate: Date | undefined;
  user: GetUserDto | undefined;
  book: BookResponseDto | undefined;
  returnDate: Date | undefined;
}

export class CreateLoanDto {
  bookId: number | undefined;
}

export class UpdateLoanDto {
  loanId: number | undefined;
  bookId: number | undefined;
}

export class UpdateLoanResponseDto {
  loanDate: Date | undefined;
  dueDate: Date | undefined;
  userId: number | undefined;
  bookId: number | undefined;
  returnDate: Date | undefined;
}
