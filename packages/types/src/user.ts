export interface User {
  id: number;
  email: string;
  name?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  password: string;
}

export interface CreateUserDto {
  password: string;
  email: string;
}
