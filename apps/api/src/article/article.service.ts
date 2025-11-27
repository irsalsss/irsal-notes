import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto, userId: number) {
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.article.findMany({
      where: {
        published: true,
        userId,
      },
    });
  }

  findDrafts(userId: number) {
    return this.prisma.article.findMany({
      where: {
        published: false,
        userId,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    if (article.userId !== userId) {
      throw new ForbiddenException('You do not have access to this article');
    }

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, userId: number) {
    await this.findOne(id, userId);

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);

    return this.prisma.article.delete({
      where: { id },
    });
  }
}
