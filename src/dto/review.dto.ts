import { GetUserDto } from './user.dto';
import { BookResponseDto } from './book.dto';

export class CreateReviewDto {
  userId: number | undefined;
  rating: string | undefined;
  comment: string | undefined;
}

export class GetReviewDto {
  reviewId: number | undefined;
  book: BookResponseDto | undefined;
  rating: string | undefined;
  comment: string | undefined;
  reviewDate: Date | undefined;
  user: GetUserDto | undefined;
}

export class UpdateReviewDto {
  rating: string | undefined;
  comment: string | undefined;
}
