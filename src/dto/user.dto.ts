export class GetUserDto {
  id: number | undefined;
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

export class PatchUserDto {
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}
