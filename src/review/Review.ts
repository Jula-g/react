import Book from '../book/Book';
import User from '../user/User';

export interface Review {
  reviewId: number;
  book: Book;
  user: User;
  rating: string;
  comment: string;
  reviewDate: Date;
}

export default Review;
