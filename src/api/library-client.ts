import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { BookResponseDto, CreateBookDto } from '../dto/book.dto';
import {
  CreateLoanDto,
  CreateLoanResponseDto,
  GetLoanResponseDto,
  UpdateLoanDto,
  UpdateLoanResponseDto,
} from '../dto/loan.dto';
import { RegisterDto, RegisterResponseDto } from '../dto/register.dto';
import Cookies from 'universal-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { GetUserDto, PatchUserDto } from '../dto/user.dto';
import {
  CreateReviewDto,
  GetReviewDto,
  UpdateReviewDto,
} from '../dto/review.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

interface MyJwtPayload extends JwtPayload {
  role?: string;
  userId?: number;
}

export class LibraryClient {
  private client: AxiosInstance;
  private cookies = new Cookies();

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
    });

    this.client.interceptors.request.use((config) => {
      const token = this.cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public getUserRole(): string {
    const token = this.cookies.get('token');
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      if (decoded.role) {
        return decoded.role;
      }
    }
    return '';
  }

  public isLoggedIn(): boolean {
    const token = this.cookies.get('token');
    return token !== undefined;
  }

  public async updateUser(
    user: PatchUserDto,
    id: number,
  ): Promise<ClientResponse<GetUserDto | null>> {
    try {
      const response = await this.client.patch(`/user/update/${id}`, user);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteUser(id: number): Promise<ClientResponse<null>> {
    try {
      const response = await this.client.delete(`/user/delete/${id}`);
      return {
        success: true,
        data: null,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getAllUsers(): Promise<ClientResponse<GetUserDto[] | null>> {
    try {
      const response = await this.client.get('/user/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('Error fetching users:', axiosError);

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        'auth/login',
        data,
      );

      if (response.data.token) {
        this.client.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.token}`;
        const decoded = jwtDecode<MyJwtPayload>(response.data.token);

        if (decoded.exp) {
          this.cookies.set('token', response.data.token, {
            expires: new Date(decoded.exp * 1000),
          });
        }
      }
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async register(
    data: RegisterDto,
  ): Promise<ClientResponse<RegisterResponseDto | null>> {
    try {
      const response: AxiosResponse<RegisterResponseDto> =
        await this.client.post('/auth/register', data);

      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public logOut(): void {
    this.cookies.remove('token');
    this.client.defaults.headers.common['Authorization'] = '';
  }

  public getUserId(): number {
    const token = this.cookies.get('token');
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      if (decoded.userId) {
        return decoded.userId;
      }
    }
    return 0;
  }

  public async getBooks(): Promise<ClientResponse<BookResponseDto | null>> {
    try {
      const response = await this.client.get('/book/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async createBook(
    book: CreateBookDto,
  ): Promise<ClientResponse<BookResponseDto | null>> {
    try {
      const response = await this.client.post('/book/create', book);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteBook(id: number): Promise<ClientResponse<null>> {
    try {
      const response = await this.client.delete(`/book/delete/${id}`);
      return {
        success: true,
        data: null,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  async updateBook(
    book: CreateBookDto,
    id: number,
  ): Promise<ClientResponse<BookResponseDto | null>> {
    try {
      const response = await this.client.patch(`/book/update/${id}`, book);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBookByTitle(
    title: string,
  ): Promise<ClientResponse<BookResponseDto | null>> {
    try {
      const response = await this.client.get(`/book/getBookByTitle/${title}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(): Promise<ClientResponse<GetLoanResponseDto | null>> {
    try {
      const response = await this.client.get('/loan/getAll');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async createLoan(
    loan: CreateLoanDto,
  ): Promise<ClientResponse<CreateLoanResponseDto | null>> {
    try {
      const response = await this.client.post('/loan/create', loan);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.log(error);
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async updateLoan(
    loan: UpdateLoanDto,
  ): Promise<ClientResponse<UpdateLoanResponseDto | null>> {
    try {
      const response = await this.client.put('/loan/update', loan);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async createReview(
    bookId: number,
    review: CreateReviewDto,
  ): Promise<ClientResponse<GetReviewDto | null>> {
    try {
      const response = await this.client.post(
        `/review/create/${bookId}`,
        review,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getReviews(
    bookId: number,
  ): Promise<ClientResponse<GetReviewDto[] | null>> {
    try {
      const response = await this.client.get(`/review/getAll/${bookId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async updateReview(
    reviewId: number,
    review: UpdateReviewDto,
  ): Promise<ClientResponse<GetReviewDto | null>> {
    try {
      const response = await this.client.patch(
        `/review/update/${reviewId}`,
        review,
      );
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteReview(reviewId: number): Promise<ClientResponse<null>> {
    try {
      const response = await this.client.delete(`/review/delete/${reviewId}`);
      return {
        success: true,
        data: null,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
