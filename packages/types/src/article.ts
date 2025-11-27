/**
 * Article entity type
 */
export interface Article {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  userId: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/**
 * DTO for creating a new article
 */
export interface CreateArticleDto {
  title: string;
  content?: string;
  published?: boolean;
}

/**
 * DTO for updating an existing article
 */
export type UpdateArticleDto = Partial<CreateArticleDto>;

