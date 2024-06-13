export class RegisterDto {
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;
  lastName: string | undefined;
}

export class RegisterResponseDto {
  userId: number | undefined;
  username: string | undefined;
  token: string | undefined;
  role: string | undefined;
}
