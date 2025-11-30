import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'The title of the article',
    example: 'My First Article',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'Hello World content...',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Publish status', default: false })
  @IsOptional()
  published?: boolean;
}
