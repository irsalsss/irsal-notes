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

  findAll(userId?: number) {
    if (userId) {
      // If authenticated, return user's published articles
      return this.prisma.article.findMany({
        where: {
          published: true,
          userId,
        },
      });
    }
    // If not authenticated, return all published articles
    return this.prisma.article.findMany({
      where: {
        published: true,
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

  async findOne(id: number, userId?: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    // If article is published, anyone can access it
    if (article.published) {
      return article;
    }

    // If article is not published, only the owner can access it
    if (!userId || article.userId !== userId) {
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
