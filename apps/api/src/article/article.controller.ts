import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { AuthGuard, RequestWithUser } from 'src/auth/auth.guard';

@Controller('articles')
@ApiTags('articles')
@UseGuards(AuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiCreatedResponse({ type: Article })
  create(
    @Body() createArticleDto: CreateArticleDto,
    @Request() req: RequestWithUser,
  ) {
    const userId = parseInt(req.user.sub);
    return this.articleService.create(createArticleDto, userId);
  }

  @Get()
  @ApiOkResponse({ type: Article, isArray: true })
  findAll(@Request() req: RequestWithUser) {
    const userId = parseInt(req.user.sub);
    return this.articleService.findAll(userId);
  }

  @Get('drafts')
  @ApiOkResponse({ type: Article, isArray: true })
  findDrafts(@Request() req: RequestWithUser) {
    const userId = parseInt(req.user.sub);
    return this.articleService.findDrafts(userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: Article })
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    const userId = parseInt(req.user.sub);
    return this.articleService.findOne(+id, userId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Article })
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Request() req: RequestWithUser,
  ) {
    const userId = parseInt(req.user.sub);
    return this.articleService.update(+id, updateArticleDto, userId);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Article })
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    const userId = parseInt(req.user.sub);
    return this.articleService.remove(+id, userId);
  }
}
