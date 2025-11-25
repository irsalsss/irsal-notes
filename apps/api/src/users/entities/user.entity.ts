import type { User as UserType } from '@repo/types';
import { ApiProperty } from '@nestjs/swagger';

export class User implements UserType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
