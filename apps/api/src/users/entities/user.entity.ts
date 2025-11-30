import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  jobTitle?: string;

  @ApiProperty({ required: false })
  location?: string;

  @ApiProperty({ required: false })
  company?: string;

  @ApiProperty({ required: false })
  aboutMe?: string;

  @ApiProperty({ required: false })
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
