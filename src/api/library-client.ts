import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { BookResponseDto, CreateBookResponseDto } from '../dto/book.dto';
import { CreateLoanResponseDto } from '../dto/loan.dto';
import { CreateUserResponseDto } from '../dto/user.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
    });
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/auth/login',
        data,
      );

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
    book: CreateBookResponseDto,
  ): Promise<ClientResponse<CreateBookResponseDto | null>> {
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

  public async createLoan(
    loan: CreateLoanResponseDto,
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
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async createReader(
    reader: CreateUserResponseDto,
  ): Promise<ClientResponse<CreateUserResponseDto | null>> {
    try {
      const response = await this.client.post('/reader/create', reader);
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
}
