import { ApiProperty } from '@nestjs/swagger';
import type { Article as ArticleType } from '@repo/types';

export class Article implements ArticleType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  content: string | null;

  @ApiProperty()
  published: boolean;

  @ApiProperty({ required: false })
  createdAt?: Date;

  @ApiProperty({ required: false })
  updatedAt?: Date;
}
